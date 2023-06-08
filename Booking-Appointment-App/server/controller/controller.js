const User=require('../model/model')
const path = require('path');
const rootDir= path.dirname(require.main.filename);


//POST Function
const postAddProduct = (req, res, next) => {
  const name=req.body.name;
      const email=req.body.email;
      const phone=req.body.phone;
      const date=req.body.date;
      User.create({
        name:name,
        email:email,
        phone:phone,
        date:date
      })
      .then((result)=>{
       
          console.log('Create Successfull');
         
      })
      .catch((err)=>{
          console.log(err);
          res.status(400).send(err.message)
      })
    // try{
    //   const name=req.body.name;
    //   const email=req.body.email;
    //   const phone=req.body.phone;
    //   const date=req.body.date;

    //   console.log("comes as:"+name+email+phone+date)
    //   const data =await User.create({
    //     name:name,
    //     email:email,
    //     phone:phone,
    //     date:date
    //   })
    // }catch(err){
    //   console.log(err)
    // }
  };



  //GET Function
const getdata=(req,res,next)=>{
  User.findAll()
      .then(users => {
          res.json(users)
          //console.log(res.json(users)); 
      })
      .catch(err => {
          console.log(err);
          res.status(500).send(err.message)
      })
  // const users=await User.findAll();
  // try{
  //   res.send(users);
  // }catch(err){
  //   console.log('get data controller error:'+err);
  //   res.status(500).send(err);
  // }
}


//DELETE Function 
const deletedata=async(req,res,next)=>{
  const id=req.params.id;
  const deleteid=await User.findByPk(id);
  try{

    const destruction=await deleteid.destroy();

    try{
      res.send("deleted")
    }catch(err){
      res.send(err.message)
    }

  }catch(err){
    console.log(err)
    res.status(400).send(err.message)
  }
}


//PAGE NOT FOUND
const pageNotFound =(req, res, next)=>{
  res.status(404).sendFile(path.join(rootDir,'views','404.html'));

}

module.exports ={ postAddProduct, getdata, deletedata, pageNotFound }

