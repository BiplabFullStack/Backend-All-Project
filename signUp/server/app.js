
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const cors=require('cors');
const chalk = require('chalk')
const router=require('./router/signUpRouter.js')
const loginRouter = require('./router/loginRouter')

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use(router)
app.use(loginRouter)


sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(3000,()=>{
        console.log(chalk.magenta.inverse( `Server running on port 3000 `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});
