import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

// any user
export const isUser = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  // if not token
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      "495de14aa86115fb4ef7c79e4b5838e9d88ae5a51a46758b8d5ba0fdc53dc272da60c8613341c48b619ac88e5896956b40d1bf93ddcf5b0185ba58fc87bd0c7e"
    );
  } catch (error) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }
  // find user using userId from payload
  const user = await User.findOne({ _id: payload.userId });
  // if not user, throw error
  if (!user) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }

  req.loggedInUserId = user._id;

  // call next function
  next();
};

// check if the role is seller
export const isSeller = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  // if not token
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      "495de14aa86115fb4ef7c79e4b5838e9d88ae5a51a46758b8d5ba0fdc53dc272da60c8613341c48b619ac88e5896956b40d1bf93ddcf5b0185ba58fc87bd0c7e"
    );
  } catch (error) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }
  // find user using userId from payload
  const user = await User.findOne({ _id: payload.userId });
  // if not user, throw error
  if (!user) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }
  // user role must be seller
  if (user.role !== "seller") {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }

  req.loggedInUserId = user._id;

  // call next function
  next();
};

// check if the role is buyer
export const isBuyer = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  // if not token
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      "495de14aa86115fb4ef7c79e4b5838e9d88ae5a51a46758b8d5ba0fdc53dc272da60c8613341c48b619ac88e5896956b40d1bf93ddcf5b0185ba58fc87bd0c7e"
    );
  } catch (error) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }
  // find user using userId from payload
  const user = await User.findOne({ _id: payload.userId });
  // if not user, throw error
  if (!user) {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }
  // user role must be seller
  if (user.role !== "buyer") {
    {
      return res.status(401).send({ message: "Unauthorized." });
    }
  }

  req.loggedInUserId = user._id;

  // call next function
  next();
};
