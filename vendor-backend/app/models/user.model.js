const { TINY } = require("mysql/lib/protocol/constants/types");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      }
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.TEXT
    },
    city: {
      type: Sequelize.STRING
    },
    postcode: {
      type: Sequelize.TEXT
    },
    address1: {
      type: Sequelize.STRING
    },
    address2: {
      type: Sequelize.STRING
    }
  });
  return User;
}
