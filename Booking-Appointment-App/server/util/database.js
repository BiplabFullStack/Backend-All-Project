const Sequelize = require("sequelize");
const sequelize = new Sequelize("appointmentapp", "root", "Biplab@1997", {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize;