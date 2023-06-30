
//--------------------------------------------------  Dependencies  -----------------------------------------------------------
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./Database/database');
const cors=require('cors');
const chalk = require('chalk')



//-----------------------------------------------------  Router  ------------------------------------------------------------------

const websiteRouter = require('./Router/websiteRoute')
const signUpRouter=require('./Router/signUpRouter')
const loginRouter = require('./Router/signInRouter')
const purchase = require('./Router/purchase')


//--------------------------------------------------- Schema(Model) -------------------------------------------------------------
const User = require('./Model/signUpModel')
const Expence = require('./Model/websiteModel')
const Order = require('./Model/purchase')


//App
const app=express();
app.use(bodyParser.json());
app.use(cors());



app.use(signUpRouter)
app.use(loginRouter)
app.use(websiteRouter)
app.use('/purchase',purchase)


// -----------------------------------------------------  RelationShif ---------------------------------------------------------

User.hasMany(Expence)
Expence.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)



//---------------------------------------------------  Connectd to Sequelizer --------------------------------------------------

sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(3000,()=>{
        console.log(chalk.magenta.inverse( `Server running on port 3000 `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});



//-------------------------------------------------------  Page Not Found  ----------------------------------------------------

app.use('/*',(req, res)=>{
    res.status(404)
    .send('<h1  style ="text-align: center;">Page Not Found !!!</h1>')
})