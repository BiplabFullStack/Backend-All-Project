
const User = require('../model/signUpModel')
const chalk = require('chalk')
const bcrypt = require('bcrypt')
const { isInvalid } = require('../validation/validator')


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(isInvalid(email) || isInvalid(password)){
            console.log(chalk.red('Please fill all the input '));
            return res
            .status(400)
            .json({status: false, err: "Bad parameter Something is missing"})
        }

        const user = await User.findAll({
            where: {
                email
            }
        })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500)
                        .json({ status: false, msg: 'Something went wrong' })
                }
                if (result) {
                    res.status(200)
                        .json({ status: true, msg: 'User login Successfully ' })
                    console.log(chalk.magenta("Login Successfully"));
                }
                else {
                    console.log(chalk.red("Wrong password"));
                    return res
                        .status(400)
                        .json({ status: false, msg: 'Wrong Password' })

                }
            })
        }
        else {
            return res
                .status(404)
                .json({ status: false, msg: 'User not found' })
        }
    }
    catch (err) {
        res.status(500)
            .json({ status: false, msg: 'Server Error' })
    }

}























/*

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

*/
module.exports.login = login