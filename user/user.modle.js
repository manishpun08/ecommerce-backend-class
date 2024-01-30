import mongoose from "mongoose";
import { date } from "yup";

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

// create table
const User = mongoose.model("User", userSchema);

export default User;
