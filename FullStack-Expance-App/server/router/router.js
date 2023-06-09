const express=require('express');
const router=express.Router();

const {postAddProduct, getdata,deletedata, pageNotFound}=require('../controller/controller')

//add data to databse
router.post('/postdata',postAddProduct);

//get data from database
router.get('/getdata',getdata)

//delete data
router.delete('/deletedata/:id',deletedata);

//Page Not Found 
router.get('/*',pageNotFound)



module.exports=router;

