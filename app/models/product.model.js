const ProductModel = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING
    },
    uom: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    }
  });
  return Product;
};
export default ProductModel;
