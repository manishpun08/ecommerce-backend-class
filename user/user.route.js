import express, { response } from "express";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import { generateHashPassword } from "../utils/password.function.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// register user
router.post(
  "/user/register",
  async (req, res, next) => {
    // extract new user rom req.body
    const newUser = req.body;
    // validate new user
    try {
      const validatedData = await registerUserValidationSchema.validate(
        newUser
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // find user using email
    const user = await User.findOne({ email: newUser.email });
    // if user, throw error,
    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }
    // hash password
    const hashedPassword = await generateHashPassword(newUser.password);
    newUser.password = hashedPassword;

    // create user
    await User.create(newUser);
    // send response
    return res
      .status(201)
      .send({ message: "User is registered successfully." });
  }
);

// login user
router.post(
  "/user/login",
  async (req, res, next) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    // validate
    try {
      const validatedData = await loginUserValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract login credential from req.body
    const loginCredentials = req.body;
    // find user using email
    const user = await User.findOne({ email: loginCredentials.email });
    // if no user, throw error
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // check for password match
    const isPassword = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    // if not password match, throw error
    if (!isPassword) {
      if (!user) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }
    }
    // generate token
    let payload = { userId: user._id };
    const token = jwt.sign(
      payload,
      "495de14aa86115fb4ef7c79e4b5838e9d88ae5a51a46758b8d5ba0fdc53dc272da60c8613341c48b619ac88e5896956b40d1bf93ddcf5b0185ba58fc87bd0c7e",
      {
        expiresIn: "1d",
      }
    );
    // send res
    return res
      .status(200)
      .send({ message: "success", user: user, token: token });
  }
);

export default router;
