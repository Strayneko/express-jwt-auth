import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const Customer = db.customer;

export const createUser = (req, res) => {
  Customer.create({
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender,
  })
    .then(customer => {
      res.send({
        message: "User was registered successfully!",
        data: customer,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
