const Sequelize = require("sequelize");
const sequelize = new Sequelize("hotel-waiter", "root", "Biplab@1997", {
  dialect: "mysql",
  host: "localhost",
  logging: false  //Remove extra printed from terminal 
});


module.exports = sequelize;