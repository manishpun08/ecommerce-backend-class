import mongoose from "mongoose";

const dbName = "ecommerce-class";
const userName = "manishpunmagar999";
const userPassword = "manish123";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0.ilpsipk.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log("Database is not connected.");
    console.log(error.message);
  }
};

export default connectDB;
