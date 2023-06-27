const express=require('express');
const router=express.Router();

const { postAddExpence, getAllExpence, deleteExpence } = require('../Controller/websiteController')

router.post('/postwebdata', postAddExpence)
router.get('/getdata', getAllExpence)
router.delete('/deletedata/:id', deleteExpence)

module.exports = router;