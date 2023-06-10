
const User = require('../model/model')


// Data store into the Database
const postAddProduct =(req, res, next)=>{
    const name = req.body.name;
    const expence = req.body.expence;
    const item = req.body.item;
    const category = req.body.category;

    User.create({
        name:name,
        expence:expence,
        item:item,
        category:category
    })
    .then((result)=>{
        res.status(201).send({status:true, msg: "Data Successfully Created "})
        console.log(`Create Successfull  Name:${name} - Exp: ${expence} - Item: ${item} - Category: ${category}`);
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
const deletedata =async(req, res, next)=>{
    const userId = req.params.id;
    const deleteId = await User.findByPk(userId);
    try{
        await deleteId.destroy();
        try{
            res.status(200).send({status: true, msg : "Deleted Successfully"})
        }
        catch(err){
            res.status(500).send({status: false, Error : err.message})
            console.log(err.message);
        }
    }
    catch(err){
        console.log(err.message);
    }
}


//Edit Data
const editdata = (req, res, mext)=>{
    const userId = req.params.id;
    const editItem =  User.findByPk(userId)
    .then(editItem =>{
        editItem.name = req.body.name;
        editItem.expence =req.body.expence;
        editItem.item = req.body.item;
        editItem.category = req.body.item;
        return User.save()
        .then(result=>{
            console.log("Updated");
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
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

