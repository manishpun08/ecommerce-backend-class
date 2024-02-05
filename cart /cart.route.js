import express from "express";
import mongoose from "mongoose";
import { isBuyer } from "../middleware/authentication.middleware.js";
import { cartReqBodyValidation } from "../middleware/cart.reqBody.validation.middleware.js";
import { checkMongoIdFromParams } from "../middleware/mongo.id.validity.middleware.js";
import Product from "../product/product.model.js";
import Cart from "./cart.model.js";

const router = express.Router();
// add item to cart
// role => buyer
router.post(
  "/cart/item/add",
  // check if user is Buyer
  isBuyer,

  // validate cart items
  cartReqBodyValidation,

  // validating product id.
  (req, res, next) => {
    // extract productId from req.body
    const productId = req.body.productId;

    // validate product Id for mongo Id
    const isValidMongoId = mongoose.isValidObjectId(productId);

    // if no valid, throw error
    if (!isValidMongoId) {
      return res.status(400).send({ message: "Invalid product id" });
    }
    // call next function
    next();
  },

  // create cart, add item to cart function
  async (req, res) => {
    // extract cart item from req.body
    const cartItem = req.body;

    // attach buyerId to cart item
    cartItem.buyerId = req.loggedInUserId;

    // check if the item is added to cart
    const cart = await Cart.findOne({
      productId: cartItem.productId,
      buyerId: req.loggedInUserId,
    });

    // if item is already in cart, throw error
    if (cart) {
      return res
        .status(409)
        .send({ message: "Item is already added to cart." });
    }
    // find product
    const product = await Product.findOne({ _id: cartItem.productId });

    // if ordered quantity is greater than product quantity, throw error
    if (cartItem.oderQuantity > product.quantity) {
      return res.status(403).send({ message: "Product is outnumbered." });
    }
    // create cart
    await Cart.create(cartItem);

    // send response
    return res
      .status(200)
      .send({ message: "Item is added to cart successfully." });
  }
);

// flush cart
router.delete("/cart/flush", isBuyer, async (req, res) => {
  await Cart.deleteMany({ buyerId: req.loggedInUserId });
  return res.status(200).send({ message: "Cart is deleted successfully." });
});

// remove single item from cart
router.delete(
  "/cart/item/remove/:id",
  isBuyer,
  checkMongoIdFromParams,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;

    // remove that item from cart for logged in buyer
    await Cart.deleteOne({ productId: productId, buyerId: req.loggedInUserId });

    // send response
    return res
      .status(200)
      .send({ message: "Item is removed from cart successfully." });
  }
);

// list cart item
router.get("/cart/item/list", isBuyer, async (req, res) => {
  const cartItemList = await Cart.aggregate([
    {
      $match: {
        buyerId: req.loggedInUserId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        name: { $first: "$productDetails.name" },
        brand: { $first: "$productDetails.brand" },
        price: { $first: "$productDetails.price" },
        availableQuantity: { $first: "$productDetails.quantity" },
        category: { $first: "$productDetails.category" },
        productId: 1,
        oderQuantity: 1,
      },
    },
  ]);
  return res.status(200).send({ message: "success", cartItem: cartItemList });
});

// TODO:update cart quantity.
export default router;
