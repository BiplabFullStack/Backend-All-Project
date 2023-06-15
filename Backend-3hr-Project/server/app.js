
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const cors=require('cors');
const router=require('./router/router.js')

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use(router)


sequelize.sync().then(result=>{
    console.log('Database Connected ....')
    app.listen(3000,()=>{
        console.log(`Server running on port 3000 `);
    });
}).catch(err=>{
    console.log(err);
});
