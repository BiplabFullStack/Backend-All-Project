const Sequelize = require("sequelize");
const sequelize = new Sequelize("expence", "root", "Biplab@1997", {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize;