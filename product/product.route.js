import express from "express";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { isSeller } from "../middleware/authentication.middleware.js";
import Product from "./product.model.js";
import { reqBodyValidate } from "../middleware/validation.middleware.js";

const router = express.Router();

// add product, system user, role => seller

router.post("/product/add", isSeller, 
reqBodyValidate, async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;
  // add sellerId
  newProduct.sellerId = req.loggedInUserId;
  // create product
  await Product.create(newProduct);
  // send response
  return res.status(201).send({ message: "Product is added successfully." });
});

export default router;
