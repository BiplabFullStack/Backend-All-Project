const Sequelize = require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING(255),
    email:Sequelize.STRING(255),
    phone:Sequelize.STRING(255),
    date:Sequelize.DATE
});

module.exports=User;



// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('users', {
//     id : {
//         type : Sequelize.INTEGER,
//         allowNull : false,
//         autoIncrement : true,
//         primaryKey : true
//     },
//     name : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     phone : {
//         type : Sequelize.STRING,
//         allowNull : false,
//         unique : true
//     },
//     email : {
//         type : Sequelize.STRING,
//         allowNull : false,
//         unique : true
//     }
// }
// );

// module.exports = User;