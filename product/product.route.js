import express from "express";
import { isSeller, isUser } from "../middleware/authentication.middleware.js";
import { reqBodyValidate } from "../middleware/validation.reqBody.middleware.js";
import Product from "./product.model.js";
import mongoose from "mongoose";
import { checkMongoIdFromParams } from "../middleware/mongo.id.validity.middleware.js";

const router = express.Router();

// add product, system user, role => seller
router.post("/product/add", isSeller, reqBodyValidate, async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;
  // add sellerId
  newProduct.sellerId = req.loggedInUserId;
  // create product
  await Product.create(newProduct);
  // send response
  return res.status(201).send({ message: "Product is added successfully." });
});

// get product details
router.get(
  "/product/details/:id",
  // authenticating user
  isUser,
  // validating mongo id
  checkMongoIdFromParams,
  // getting product details
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exits." });
    }
    // send product as response
    return res
      .status(200)
      .send({ message: "success", productDetails: product });
  }
);

// delete product
router.delete(
  "/product/delete/:id",
  // authenticating seller only
  isSeller,
  // validating mongo id
  checkMongoIdFromParams,
  // deleting product
  async (req, res) => {
    // check product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }

    //? check for owner of product
    // loggedInUserId must be same with product's sellerId
    const isOwnerOfProduct = product.sellerId.equals(req.loggedInUserId);

    // if not owner of product, throw error
    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You are not owner of this product." });
    }
    // delete product
    await Product.deleteOne({ _id: productId });
    // send proper response
    return res
      .status(200)
      .send({ message: "Product is deleted successfully." });
  }
);

// edit product
router.put(
  "/product/edit/:id",
  // authenticating seller only
  isSeller,
  // validating mongo id
  checkMongoIdFromParams,
  // validate product
  reqBodyValidate,
  // edit product function
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
    // check for ownership of product
    const isOwnerOfProduct = product.sellerId.equals(req.loggedInUserId);
    // if not owner, throw error
    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You are not owner of this product." });
    }
    // extract new values from req.body
    const newValues = req.body;
    // edit product
    await Product.updateOne(
      { _id: productId },
      {
        $set: {
          ...newValues,
        },
      }
    );
    // send response
    return res
      .status(200)
      .send({ message: "Product is updated successfully." });
  }
);


export default router;
