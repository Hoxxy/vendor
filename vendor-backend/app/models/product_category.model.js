module.exports = (sequelize, Sequelize) => {
  const ProductCategory = sequelize.define("product_categories", {
    title: {
      type: Sequelize.STRING
    }
  });
  return ProductCategory;
}
