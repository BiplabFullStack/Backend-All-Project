
const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('expence-tracker',{
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
    expence:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    item:{
        type: Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User;