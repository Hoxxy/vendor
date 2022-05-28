const express = require("express"); // Used for building the REST API
const cors = require("cors"); // Provides Express middleware to enable CORS
const app = express(); // Creating an Express app
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database setup
const db = require("./app/models");
const Role = db.role;

// Dev
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and resync the database");
//   initial();
// });
// initial = () => {
//   Role.create({
//     id: 1,
//     name: "user"
//   }).catch(err => {
//     return res.status(500).send({ message: err.message });
//   });
//
//   Role.create({
//     id: 2,
//     name: "admin"
//   });
// }

// Production
db.sequelize.sync().then(() => {
  // initial();
});


// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/product_category.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 1313;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});








/*
var app = require("express")();
var bodyParser = require("body-parser");
var mysql = require("mysql");

const port = 1313;
dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vendor",
});
dbConn.connect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var users = require("./routes/users");
var reviews = require("./routes/reviews");
var products = require("./routes/products");
var categories = require("./routes/categories");
var orders = require("./routes/orders");
var orderProducts = require("./routes/order_products");
app.use("/api/user", users);
app.use("/api/review", reviews);
app.use("/api/product", products);
app.use("/api/productCategory", categories);
app.use("/api/order", orders);
app.use("/api/order_product", orderProducts);

app.listen(port, () => {
  console.log(`Node app is running on port ${port}`);
});
module.exports = app;
*/
