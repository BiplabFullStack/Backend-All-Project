const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { userleaderboard , download } = require('../Controller/premiumuser')

router.get('/leaderboard',authenticate, userleaderboard)

//get download file
router.get('/download',authenticate,download)


module.exports = router;