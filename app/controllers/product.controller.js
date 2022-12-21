import db from "../models/index.js";

const Product = db.product;

export const createProduct = async (req, res) => {
  try {
    // insert product
    const insertProduct = await Product.create({
      name: req.body.name,
      uom: req.body.uom,
      stock: req.body.stock,
      price: req.body.price
    });
    // response when product stored to database successfully
    return res.send({
      message: "Product successfully added!",
      data: insertProduct
    });
  } catch (e) {
    // return error message
    return res.status(500).send({
      message: e.message
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    // get all product from database
    const products = await Product.findAll();
    // check is any product available in database
    if (products.length === 0) {
      return res.send({
        message: "No Product found in database!"
      });
    }

    return res.send({
      message: "Data successfully fetched!",
      data: products
    });
  } catch (e) {
    return res.status(500).send({
      message: e.message
    });
  }
};
