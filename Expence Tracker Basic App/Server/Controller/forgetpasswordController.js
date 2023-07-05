const Sib=require('sib-api-v3-sdk');
require('dotenv').config();
const chalk = require('chalk')
const { emailInValid } = require('../Validation/validation')

const client=Sib.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const forgotPasswordEmail=async(req, res, next)=>{
    const forgotUserEmail=req.body.email;
    if (emailInValid(forgotUserEmail)) {
        console.log(chalk.red('Please enter currect email '));
        return res
            .status(400)
            .json({ status: false, err: "Please enter currect email" })
    } 
    //console.log(req.body.email)
    const client=Sib.ApiClient.instance;

    // Configure API key authorization: api-key
    var apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;
    const tranEmailApi=new Sib.TransactionalEmailsApi;

    const sender={
        email:'biplbbackend@gmail.com',
        name:'Biplab pvt.ltd'
    }
    const receivers=[
        {
            email:forgotUserEmail
        }
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'OTP VERIFICATION',
        textContent:`Your OTP is <b>{{params.otp}}</b>, Please Login again from our website .`,
        params:{
            otp: Math.floor(1000 + Math.random() * 9000) //Generate random number every time
        }
    }).then(result=>{
        console.log(result);
        res.status(201).json({success:true,message:'we have send you OTP in your user email account'});
    }).catch(err=>{
        console.log(err)
        return res.status(500).json(err)
    })
}

module.exports.forgotPasswordEmail = forgotPasswordEmail;