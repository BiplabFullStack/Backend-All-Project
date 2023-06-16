
const { where } = require('sequelize');
const User = require('../model/model')


// Data store into the Database Using Promise
const postAddProduct = (req, res, next) => {
    const { price, disk, table } = req.body;

    User.create({
        price: price,
        disk: disk,
        table: table
    })
        .then((result) => {
            res.status(201).send({ status: true, msg: "Data Successfully Created " })
            console.log(`Create Successfull  Price: ${price} - Disk: ${disk} - Table: ${table}`);
        })
        .catch((err) => {
            res.status(500).send({ status: false, Error: err.message });
            console.log(err.message);
        })
}

// Data store into the Database Using Try Catch

/*
const postAddProduct = async (req, res, next) => {
    try {
        const { price, disk, table } = req.body;
        const data = await User.create({
            price: price,
            disk: disk,
            table: table
        })
        try{
            res.status(201).send({status:true, msg: "Data Successfully Created "})
         console.log(`Create Successfull  Price: ${price} - Disk: ${disk} - Table: ${table}`);
        }
        catch(err){
            console.log(err.message);
        }

    }
    catch(err){
        console.log(err.message);
    }
}

*/

//Get All Data 
const getdata = async (req, res, next) => {
    const allData = await User.findAll({raw: true}); //Get Only raw Data
    console.log(allData);
    try {
        res.json(allData);
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}


//Delete Data Using Promise
const deletedata = (req, res, next) => {
    const userId = req.params.id;
    User.destroy({
        where: {
            id: userId
        }
    })
        .then((result) => {
            res.status(200).send({ status: true, msg: "Deleted Successfully" })
        })
        .catch(err => console.log(err.message))
}




//Delete Data Using Try Catch
/*
const deletedata = async (req, res, next) => {
    try {
        const userId = req.params.id;
         await User.destroy({
            where: {
                id: userId
            }
        })
        try{
            res.status(200).send({ status: true, msg: "Deleted Successfully" })
        }
        catch(err){
            console.log(err.message)
        }
       
    }
    
    catch(err) {
        console.log(err.message)
    }
}

*/



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





//PAGE NOT FOUND
const pageNotFound = (req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')

}

module.exports = { postAddProduct, getdata, deletedata, pageNotFound }

