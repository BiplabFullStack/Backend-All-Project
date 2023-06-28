const express=require('express');
const router=express.Router();
const { authenticate } = require('../middleware/auth')
const { postAddExpence, getAllExpence, deleteExpence } = require('../Controller/websiteController')

router.post('/postwebdata', postAddExpence)
router.get('/getdata',authenticate, getAllExpence)
router.delete('/deletedata/:id', deleteExpence)

module.exports = router;