const signUp = require('../Model/signUpModel')
const userleaderboard = async (req, res) => {
    try{
    const leaderboardData = await  signUp.findAll({where:{ispremium:1}})
    if(leaderboardData.length >0){
        return res
        .status(200)
        .send(leaderboardData)
    }
}
catch(err){
    console.log(err.message);
}
}


module.exports.userleaderboard = userleaderboard;