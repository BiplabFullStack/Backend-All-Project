
const { where } = require('sequelize');
const User = require('../model/model')


// Data store into the Database
const postAddProduct =(req, res, next)=>{
    const {expence, describtion, category} = req.body; 

    User.create({
        expence:expence,
        describtion:describtion,
        category:category
    })
    .then((result)=>{
        res.status(201).send({status:true, msg: "Data Successfully Created "})
        console.log(`Create Successfull  Exp: ${expence} - describtion: ${describtion} - Category: ${category}`);
    })
    .catch((err)=>{
        res.status(500).send({status: false, Error: err.message});
        console.log(err.message);
    })
}

//Get All Data 
const getdata =async(req, res, next)=>{
    const allData = await User.findAll();
    try{
        res.json(allData);
    }
    catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

//Delete Data
const deletedata =(req, res, next)=>{
    const userId = req.params.id;
    User.destroy({
        where:{
            id:userId
        }
    })
    .then((result)=>{
        res.status(200).send({status: true, msg : "Deleted Successfully"})
    })
    .catch(err => console.log(err.message))
}



// Another Approach : 
    // const userId = req.params.id;
    // const deleteId = await User.findByPk(userId);
    // try{
    //     await deleteId.destroy();
    //     try{
    //         res.status(200).send({status: true, msg : "Deleted Successfully"})
    //     }
    //     catch(err){
    //         res.status(500).send({status: false, Error : err.message})
    //         console.log(err.message);
    //     }
    // }
    // catch(err){
    //     console.log(err.message);
    // }
    //}


//Edit Data
const editdata = (req, res, mext)=>{
    const {expence, describtion, category} = req.body; 
    console.log("New "+expence);
    const userId = req.params.id;
    console.log("Hiiii");
    User.update({
        expence: expence,
        describtion: describtion,
        category : category
    },
    {
        where:{
            id:userId,
        },
    }
   
    )
    .then((result)=>{
        console.log("Update Successfull");
    })
    .catch(err => console.log(err.message))
    
    // const userId = req.params.id;
    // const editItem = await User.findByPk(userId);
    // try{
    //     editItem.name = req.body.name;
    //     editItem.expence =req.body.expence;
    //     editItem.item = req.body.item;
    //     editItem.category = req.body.item;

    //     const updatedItem = await User.save();
    //     try{
    //         res.status(200).send(updatedItem);
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }
    // catch(err){
    //     console.log(err.message);
    // }
}

//PAGE NOT FOUND
const pageNotFound =(req, res, next)=>{
  res.status(404).send('<h1>Page Not Found</h1>')

}

module.exports ={ postAddProduct, getdata, deletedata, editdata, pageNotFound }

