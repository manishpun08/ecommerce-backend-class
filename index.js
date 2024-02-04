import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.route.js";
import cartRoutes from "./cart /cart.route.js";
const app = express();

// to make app understand json
app.use(express.json());

// connect DB
connectDB();

// register routes
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
// port and server
const PORT = 8008;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
