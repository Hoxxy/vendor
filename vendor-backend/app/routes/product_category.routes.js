const controller = require('../controllers/product_category.controller');

const API_URL = "/api/product_category";

module.exports = (app) => {
  app.get(`${API_URL}/list`, controller.findAll);
};
