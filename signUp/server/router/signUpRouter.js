const express=require('express');
const router=express.Router();

const {postSignUp, pageNotFound} = require('../controller/signUpController')

//add data to databse
router.post('/postdata', postSignUp);


//Page Not Found 
router.get('/*',pageNotFound)



module.exports=router;

