
const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('hotel-management',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },

    expence:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    describtion:{
        type: Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User;