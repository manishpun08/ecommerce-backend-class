import mongoose from "mongoose";

export const checkMongoIdFromParams = (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;
  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(id);
  // if not mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid Mongo Id" });
  }
  // call next function
  next();
};
