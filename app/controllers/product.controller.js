import db from "../models/index.js";

const Product = db.product;

export const createProduct = async (req, res) => {
  const insertProduct = await Product.create({
    name: req.body.name,
    uom: req.body.uom,
    stock: req.body.stock,
    price: req.body.price
  });
  console.log(insertProduct);
};
