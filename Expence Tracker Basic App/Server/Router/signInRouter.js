const express=require('express');
const router=express.Router();

const { loginUser } = require('../Controller/signInController');


router.post('/login', loginUser)

module.exports = router;