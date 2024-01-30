import express from "express";
import { registerUserValidationSchema } from "./user.validation.js";
import User from "./user.modle.js";
import { generateHashPassword } from "../utils/password.function.js";

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
    // create user
    newUser.password = hashedPassword;
    await User.create(newUser);
    // send response
    return res
      .status(201)
      .send({ message: "User is registered successfully." });
  }
);

export default router;
