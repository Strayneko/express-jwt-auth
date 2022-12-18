import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const Customer = db.customer;

export const listCustomer = (req, res) => {};

export const createCustomer = (req, res) => {
  Customer.create({
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender,
  })
    .then(customer => {
      res.send({
        message: "Customer was added successfully!",
        data: customer,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

export const deleteCustomer = (req, res) => {
  Customer.findOne({ where: { id: req.body.customerId } }).then(customer => {
    if (customer) {
      Customer.destroy({ where: { id: req.body.customerId } })
        .then(customer => {
          res.send({
            message: `Customer with id ${req.body.customerId} has been deleted`,
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    } else {
      res.send({
        message: `Customer has not found`,
      });
    }
  });
};
