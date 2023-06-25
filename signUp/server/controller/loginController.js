
const User = require('../model/signUpModel')
const chalk = require('chalk')

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const findData = await User.findOne({
        where: {
            email: email
        }
    })

    const findpassword = await User.findOne({
        where: {
            password: password
        }
    })
    try {
        if(findData == null && findpassword == null){
            console.log(chalk.red("Wrong email and password"));
            return res
                .status(404)
                .send({ status: false, msg: "Wrong email and password" })
        
        }
        else if(findData == null && password == findpassword.dataValues.password){
            console.log(chalk.red("Wrong email"));
            return res
                .status(404)
                .send({ status: false, msg: "Wrong email" })
        
        }
        else if(findpassword == null && email == findData.dataValues.email){
            console.log(chalk.red("Wrong password"));
            return res
                .status(401)
                .send({ status: false, msg: "Wrong password" })
        }
        
        else{
            console.log(chalk.magenta("Login Successfully"));
            return res
                .status(200)
                .send({ status: true, msg: "You successfully Login" })
        }

    }

    catch (err) {
        console.log(err.message);
    }

}

module.exports.login = login