import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.route.js";

const app = express();

// to make app understand json
app.use(express.json());

// connect DB
connectDB();

// register routes
app.use(userRoutes);

// port and server
const PORT = 8008;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
