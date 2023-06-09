
const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('signUp',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
   email:{
    type:Sequelize.STRING,
    allowNull: false
   },
   password:{
    type:Sequelize.STRING,
    allowNull:false
   }
})

module.exports = User;