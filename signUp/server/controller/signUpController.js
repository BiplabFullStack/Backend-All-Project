
const User = require('../model/signUpModel')
const chalk = require('chalk')

function isValidString(string) {
    if (string == undefined || string.length === 0) {
        return true;
    } else {
        return false;
    }
}


const postSignUp = async(req, res, next)=>{
    const {name, email, password} = req.body;
    const data = await User.findOne({
        where:{
            email:email
        }
    })

    if(data){
        console.log(chalk.red("Email Id Already exist"));
        return res.status(400).send({ status: false, msg: "EmailId Is Already Exist In DB" })
        
    }
    else if(isValidString(name) || isValidString(email) || isValidString(password)){
        res.status(400).json({err: 'Please fill properlly in your form'})
        console.log(chalk.red.inverse('Please fill properlly in your form'));
    }
    else{
        try{

            const postData = await User.create({
                name,
                email,
                password
            })
            try{
                res.status(201).send("Your Profile Successfully Created")
                console.log(chalk.cyan(`Yours Details  Name: ${name} - Email: ${email} - Password : ${password}`));
            }
            catch(err){
                console.log(chalk.red(err.message));
            }
        }
        catch(err){
            console.log(chalk.red(err.message));
        }
    }
    
}



//PAGE NOT FOUND
const pageNotFound = (req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')

}

module.exports = { postSignUp, pageNotFound }

