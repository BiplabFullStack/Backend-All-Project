
const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('hotel-waiter',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },

    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    disk:{
        type: Sequelize.STRING,
        allowNull:false
    },
    table:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User;