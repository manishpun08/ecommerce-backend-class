import mongoose from "mongoose";

// set rules
const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  oderQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// create table
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
