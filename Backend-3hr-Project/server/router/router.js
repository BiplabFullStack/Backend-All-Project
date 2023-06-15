const express=require('express');
const router=express.Router();

const {postAddProduct, getdata,deletedata, editdata, pageNotFound}=require('../controller/controller')

//add data to databse
router.post('/postdata',postAddProduct);

//get data from database
router.get('/getdata',getdata)

//delete data
router.delete('/deletedata/:id',deletedata);

router.put('/editdata/:id', editdata);

//Page Not Found 
router.get('/*',pageNotFound)



module.exports=router;

