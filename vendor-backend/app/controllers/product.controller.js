const db = require('../models');
const Op = db.Sequelize.Op;
const Product = db.product;
const ProductCategory = db.product_category;

exports.findAll = async (req, res) => {
  const products = await Product.findAll();
  console.log(products.every(product => product instanceof Product)); // true
  console.log("All products:", JSON.stringify(products, null, 2));

  res.send(JSON.stringify(products, null, 2));
};

exports.find = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: ProductCategory,
    }
  }).then(product => {
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    else {
      return res.send({ data: product });
    }
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
};

exports.insert = (req, res) => {
  Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    categoryId: req.body.categoryId
  }).then(() => {
    return res.send({ message: "Product was created successfully" });
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
};

exports.filter = (req, res) => {

  // Constructing the WHERE clause:
  let whereCondition = {};
  if (req.body.categoryId) {
    whereCondition['categoryId'] = req.body.categoryId;
  }
  if (req.body.minPrice || req.body.maxPrice) {
    let minPrice = req.body.minPrice? req.body.minPrice : 0;
    let maxPrice = req.body.maxPrice? req.body.maxPrice : Number.MAX_SAFE_INTEGER;
    whereCondition['price'] = {[Op.between]: [minPrice, maxPrice]};
  }

  Product.findAll({
    where: whereCondition,
    include: {
      model: ProductCategory,
    }
  }).then((data) => {
    if (data.length == 0) {
      return res.status(404).send({ message: "No products were found that match your criteria.", whereCondition: whereCondition });
    }
    else {
      return res.send({ data: data });
    }
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
};
