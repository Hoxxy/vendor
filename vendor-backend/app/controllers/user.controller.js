const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;

exports.loadProfile = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      } else {
        return res.send({ data: user });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  let updateFields = {};
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      updateFields[key] = req.body[key];
    }
  }
  console.log(updateFields);

  User.update(updateFields, {
    where: {
      id: req.userId,
    },
  }).then((data) => {
    return res.send({ message: "User updated successfully." });
  }).catch((err) => {
    return res.status(500).send({ message: err.message });
  });
};

// exports.allAccess = (req, res) => {
//   return res.send({ message: "Public Content." });
// };
// exports.userBoard = (req, res) => {
//   return res.send({ message: "User Content." });
// };
// exports.adminBoard = (req, res) => {
//   return res.send({ message: "Admin Content." });
// };
