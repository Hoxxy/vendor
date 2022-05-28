const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({ message: "E-mail is already in use." });
    }
    next();
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
}

checkRolesExisting = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({ message: `Role ${req.body.roles[i]} does not exist.` });
      }
    }
  }
  next();
}

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisting: checkRolesExisting
};

module.exports = verifySignUp;
