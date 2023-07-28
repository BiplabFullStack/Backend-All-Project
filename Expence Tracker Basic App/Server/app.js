
//-------------------------------------------------- Import Dependencies  -----------------------------------------------------------






require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./Database/database');
const cors=require('cors');
const chalk = require('chalk')
 const helmet = require('helmet')
 const compression = require('compression')
var path = require('path')
const fs = require('fs')
 const morgan = require('morgan')






//----------------------------------------------------- Import Router  ------------------------------------------------------------------

const expenceRouter = require('./Router/expense')
const signUpRouter=require('./Router/signUp')
const loginRouter = require('./Router/signIn')
const purchase = require('./Router/purchase')
const premiumUser = require('./Router/premiunuser')
const forgotpassword = require('./Router/forgetPassword')
const ForgotpasswordModel = require('./Model/forgetPassword')
const UrlModule=require('./Model/urlDownload')




//--------------------------------------------------- Schema(Model) -------------------------------------------------------------

const User = require('./Model/signUp')
const Expence = require('./Model/expense')
const Order = require('./Model/purchase')



//--------------------------------------------------- Execute NPM package -------------------------------------------------------------

const app=express();




app.use(bodyParser.json());
app.use(cors());
 // app.use(helmet())  //Bydefault set extra header for security purpose
 app.use(compression())   //Reduce the file size
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))






//--------------------------------------------------- Execute Router -------------------------------------------------------------

app.use(signUpRouter)
app.use(loginRouter)
app.use(expenceRouter)
app.use('/purchase',purchase)
app.use('/premium',premiumUser)
app.use('/password',forgotpassword)



app.use((req, res)=>{
   // console.log(req.url);
    res.sendFile (path.join(__dirname, 'public',`${req.url}`));
})







//-----------------------------------------------------  RelationShif ---------------------------------------------------------

User.hasMany(Expence)
Expence.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotpasswordModel)
ForgotpasswordModel.belongsTo(User)

User.hasMany(UrlModule);
UrlModule.belongsTo(User);



//---------------------------------------------------  Connectd to Sequelizer --------------------------------------------------

sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(process.env.PORT,()=>{
        console.log(chalk.magenta.inverse( `Server running on port ${process.env.PORT} `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});



//-------------------------------------------------------  Page Not Found  ----------------------------------------------------

app.use('/*',(req, res)=>{
    res.status(404)
    .send('<h1  style ="text-align: center;">Page Not Found !!!</h1>')
})






