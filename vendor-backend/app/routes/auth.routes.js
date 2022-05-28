const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const API_URL = '/api/auth';

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${API_URL}/signup`,
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisting],
    controller.signup
  );

  app.post(`${API_URL}/signin`, controller.signin);
};
