const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('expenceData',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false

    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Exp:{
        type:Sequelize.NUMBER,
        allowNull: false
    },
    Item:{
        type:Sequelize.STRING,
        allowNull: false
    },
    Category:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User