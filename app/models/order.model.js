const OrderModel = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_date: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return Order;
};

export default OrderModel;
