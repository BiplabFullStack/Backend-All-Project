
//const AWS=require('aws-sdk');
const dotnev=require('dotenv').config();

const S3Service=require('../service/S3service');
const FilesDownload=require('../Model/urlDownload')
const sequelize=require('../Database/database')

const chalk = require("chalk");
const Expence = require('../Model/expense')




const signUp = require('../Model/signUp')
const userleaderboard = async (req, res) => {
    try{
    const leaderboardData = await  signUp.findAll({where:{ispremium:1},order:[['totalexpence','DESC']]})// showing desending Order
    if(leaderboardData.length >0){
        return res
        .status(200)
        .send(leaderboardData)
    }
}
catch(err){
    console.log(err.message);
}
}




const download=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
               const expenses = await Expence.findAll( //Get Only raw Data        
               {where:{signUpId: req.user.id}})
      const stringifiedExpense=JSON.stringify(expenses);
      const signUpId=req.user.id;
  
      const filename=`Expense${signUpId}/${new Date()}.txt`;
      const fileURl= await S3Service.updatedToS3(stringifiedExpense , filename);
      
      await FilesDownload.create({
        filelink:fileURl,
        signUpId
      });
      await t.commit();
      res.status(200).json({fileURl , success:true});
    }
    catch(err){
      await t.rollback();
      console.log(err);
      res.status(500).json({message :"something went wrong"});
    }
    
  
  }
 
  
  

module.exports = { userleaderboard , download };