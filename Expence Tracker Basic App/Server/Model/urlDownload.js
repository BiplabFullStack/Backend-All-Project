const Sequelize=require('sequelize');

const sequelize=require('../Database/database');


const downloadAllFile= sequelize.define('fileurl',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    filelink:{
        type:Sequelize.STRING,
        allowNull:false
    }
})



module.exports=downloadAllFile;