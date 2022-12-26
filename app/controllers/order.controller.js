import db from "../models/index.js";

const Order = db.order;
const Customer = db.customer;
const Product = db.product;

export const createOrder = async (req, res) => {
  // transaction
  const t = await db.sequelize.transaction();
  try {
    // find customer with specific id
    const customer = await Customer.findByPk(req.body.customerId);
    if (!customer)
      return res.status(400).send({
        message: `Customer with id ${req.body.customerId} was not found!`
      });
    // find product with specific id
    const product = await Product.findByPk(req.body.productId);
    if (!product)
      return res.status(400).send({
        message: `Product with id ${req.body.productId} was not found!`
      });
    // check product stock
    if (product.stock <= 0)
      return res.status(400).send({
        message: `Product ${product.name} is out of stock!`
      });
    // insert Order
    const insertOrder = await Order.create(
      {
        customerId: req.body.customerId,
        productId: req.body.productId,
        order_date: req.body.order_date,
        status: req.body.status
      },
      { transaction: t }
    );
    await t.commit();
    // reduce product stock
    const stock = product.stock - 1;
    product.update({ stock });
    // response when product stored to database successfully
    return res.send({
      message: "Order was successfully made!",
      data: insertOrder
    });
  } catch (e) {
    // await t.rollback();
    // return error message
    return res.status(500).send({
      message: e.message
    });
  }
};

export const destroyOrder = async (req, res) => {
  try {
    // get id from parameter
    const id = req.params.id;
    // find one order by id
    const order = await Order.findOne({
      where: {
        id
      }
    });
    // check is order exists
    if (!order) {
      return res.status(400).send({
        message: "Order not found!"
      });
    }
    // delete order from database
    await order.destroy();
    res.send({
      message: `Order with id ${id} was successfully deleted!`
    });
  } catch (e) {
    return res.status(500).send({
      message: e.message
    });
  }
};
