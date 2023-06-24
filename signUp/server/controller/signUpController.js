
const User = require('../model/signUpModel')
const chalk = require('chalk')

const postSignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (req.body.length === 0) {
        console.log("Body must be filled")
        return res
            .status(400)
            .send({ status: false, err: "Body must be filled" })
    }
    if (!name || name.trim().length == 0) {
        console.log("name is require");
        return res
            .status(400)
            .send({ status: false, err: "name is require" })
    }

   

    if (!email || email.trim().length == 0) {
        console.log("email is require");
        return res
            .status(400)
            .send({ status: false, err: "email is require" })
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
        console.log("Enter valid email");
        return res
            .status(400)
            .send({ status: false, err: "Enter valid email" })
    }
    const findEmail = await User.findOne({
        where: {
            email: email
        }
    })
    if (findEmail) {
        console.log("Email already exist");
        return res
            .status(400)
            .send({ status: false, err: "Email already exist" })
    }
    if (!password || password.trim().length == 0) {
        console.log("require password");
        return res
            .status(400)
            .send({ status: false, err: "require password" })
    }
 
    const postData = await User.create({
        name,
        email,
        password
    })
    try {
        res.status(201).send("Your Profile Successfully Created")
        console.log(chalk.cyan(`Yours Details  Name: ${name} - Email: ${email} - Password : ${password}`));
    }
    catch (err) {
        console.log(chalk.red(err.message));
    }
}

``
//PAGE NOT FOUND
const pageNotFound = (req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')

}

module.exports = { postSignUp, pageNotFound }

