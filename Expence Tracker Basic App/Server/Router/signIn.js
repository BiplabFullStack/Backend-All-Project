const express=require('express');
const router=express.Router();
const { authenticate } = require('../middleware/auth')

const { loginUser, premium } = require('../Controller/signIn');


router.post('/login', loginUser)

router.get('/premiumuser',authenticate, premium)

module.exports = router;