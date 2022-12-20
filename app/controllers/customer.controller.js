import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const Customer = db.customer;

export const listCustomer = (req, res) => {
  // find all customer
  Customer.findAll()
    .then(customer => {
      if (customer.length > 0) {
        res.send({ message: "Data fetched successfully", data: customer });
      } else {
        res.send({ message: "No customer found in database" });
      }
    })
    .catch(err => {
      // catch error
      res.status(500).send({ message: err.message });
    });
};

export const detailCustomer = (req, res) => {
  // get customer by id in route parameter
  Customer.findOne({ where: { id: req.params.customerId } })
    .then(customer => {
      if (customer) {
        res.send({
          message: "Data successfully fetched!",
          data: customer
        });
      } else {
        res.send({ message: "Customer not found!" });
      }
    })
    .catch(err => {
      // catch error
      res.status(500).send({ message: err.message });
    });
};

export const updateCustomer = (req, res) => {
  // give message if no customer id given in route params
  if (!req.params.customerId) {
    return res.status(400).send({ message: "No customer id given!" });
  }
  // get customer by id in route parameter
  Customer.findOne({
    where: {
      id: req.params.customerId
    }
  })
    .then(customer => {
      // if customer found
      if (customer) {
        // update the customer
        customer.update({
          name: req.body.name,
          address: req.body.customer,
          gender: req.body.gender
        });
        res.send({
          message: "Data successfully updated"
        });
      } else {
        res.send({
          message: "Customer not found!"
        });
      }
    })
    .catch(err => {
      // catch error
      res.status(500).send({
        message: err.message
      });
    });
};

export const createCustomer = (req, res) => {
  // specific gender to male/female only
  const gender = ["male", "female"];

  // if user give gender that not in gender list
  if (!gender.includes(req.body.gender)) {
    // give bad request message
    return res.status(400).send({
      message: "Gender was not found! please choose between male/female!"
    });
  }
  // store custoemr to database
  Customer.create({
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender
  })
    .then(customer => {
      res.send({
        message: "Customer was added successfully!",
        data: customer
      });
    })
    .catch(err => {
      // catch error
      res.status(500).send({ message: err.message });
    });
};

export const deleteCustomer = (req, res) => {
  // give message if no customer id given in request body
  if (!req.body.customerId) {
    return res.status(400).send({
      message: "No customer id given!"
    });
  }
  // get customer by id from request body
  Customer.findOne({
    where: {
      id: req.body.customerId
    }
  }).then(customer => {
    // if customer found
    if (customer) {
      // delete the customer data from database
      customer
        .destroy()
        .then(customer => {
          res.send({
            message: `Customer with id ${req.body.customerId} has been deleted`
          });
        })
        .catch(err => {
          // catch error
          res.status(500).send({
            message: err.message
          });
        });
    } else {
      // give feedback message when customer data not found
      res.status(400).send({
        message: `Customer has not found`
      });
    }
  });
};
