import mongoose from "mongoose";

// set rule
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: false,
    default: null,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
    required: false,
    default: null,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["buyer", "seller"],
  },
});
// to remove password field.
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
// create table
const User = mongoose.model("User", userSchema);

export default User;
