const express=require('express');
const router=express.Router();

const { loginUser, premium } = require('../Controller/signInController');


router.post('/login', loginUser)

router.get('/premiumuser', premium)

module.exports = router;