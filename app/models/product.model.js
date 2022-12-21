const ProductModel = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Product;
};
export default ProductModel;
