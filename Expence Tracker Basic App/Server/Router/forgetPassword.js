const express=require('express');
const router= express.Router();
const { forgotPasswordEmail, resetpassword ,updatePassword } = require('../Controller/forgetpassword')

router.use('/forgotpassword', forgotPasswordEmail)
router.get('/resetpassword/:id', resetpassword)
router.use('/updatepassword/:resetpasswordid',updatePassword)

module.exports = router;