module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    title: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER.UNSIGNED
    },
    description: {
      type: Sequelize.TEXT
    },
    stock: {
      type: Sequelize.INTEGER.UNSIGNED
    }
  });
  return Product;
}
