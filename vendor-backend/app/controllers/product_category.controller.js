const db = require('../models');
const ProductCategory = db.product_category;

exports.findAll = async (req, res) => {
  const productCategories = await ProductCategory.findAll();
  console.log(productCategories.every(product => product instanceof ProductCategory)); // true
  console.log("All product categories:", JSON.stringify(productCategories, null, 2));

  res.send(JSON.stringify(productCategories, null, 2));
};
