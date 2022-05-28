const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

const API_URL = '/api/user';

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${API_URL}/load_profile`, [authJwt.verifyToken], controller.loadProfile);

  app.post(`${API_URL}/update`, [authJwt.verifyToken], controller.update);

//   app.get("/api/test/list", controller.allAccess);
//
//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
//
//   app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
