import { addProductValidationSchema } from "../product/product.validation.js";

export const reqBodyValidate = async (req, res, next) => {
  // extract new product from req.body
  const newProduct = req.body;
  // validate new product
  try {
    const validatedData = await addProductValidationSchema.validate(newProduct);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
