const express=require('express');
const router=express.Router();
const { authenticate } = require('../middleware/auth')
const { postAddExpence, getAllExpence, deleteExpence } = require('../Controller/expense')

router.post('/postwebdata',authenticate, postAddExpence)
router.get('/getdata',authenticate, getAllExpence)
router.delete('/deletedata/:id',authenticate, deleteExpence)

module.exports = router;