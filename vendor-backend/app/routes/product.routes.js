const controller = require('../controllers/product.controller');

const API_URL = "/api/product";

module.exports = (app) => {
  app.get(`${API_URL}/list`, controller.findAll);

  app.get(`${API_URL}/find/:id`, controller.find);

  app.post(`${API_URL}/insert`, controller.insert);

  app.post(`${API_URL}/filter`, controller.filter);
};
