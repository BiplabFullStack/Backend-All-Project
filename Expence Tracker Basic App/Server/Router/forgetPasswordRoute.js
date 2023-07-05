const express=require('express');
const router= express.Router();
const { forgotPasswordEmail } = require('../Controller/forgetpasswordController')

router.post('/forgotpassword', forgotPasswordEmail)

module.exports = router;