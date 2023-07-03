const express=require('express');
const router=express.Router();

const { userleaderboard } = require('../Controller/premiumuserController')

router.get('/leaderboard', userleaderboard)

module.exports = router;