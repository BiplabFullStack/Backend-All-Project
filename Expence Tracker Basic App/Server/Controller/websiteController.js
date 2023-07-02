
const { where } = require('sequelize');
const chalk = require("chalk");
const User = require('../Model/websiteModel')
const { nameInValid, passwordInValid } = require('../Validation/validation')
const sequelize = require('../Database/database')
const signUpdb = require('../Model/signUpModel')


// ---------------------------------------------------------- Post Order ----------------------------------------------------------------------

const postAddExpence = async (req, res, next) => {
    const t = await sequelize.transaction()

    try {
        const { itemName, expence, item, category } = req.body;
        if (nameInValid(itemName) || passwordInValid(expence)) {
            return res
                .status(400)
                .json({ Success: false, err: 'Something went wrong' })
        }
        const data = await User.create({
            itemName,
            expence,
            item,
            category,
            signUpId: req.user.id

        },{transaction: t})

        const totalexpence = Number(req.user.totalexpence) + Number(expence)
        await signUpdb.update({totalexpence:totalexpence},{where:{id:req.user.id},transaction: t})
        await t.commit()
        res.status(201)
            .json({ status: true, msg: "Tracker Successfully Created " })
        console.log(chalk.magenta(`Experce  -> itemName: ${itemName} - Expence: ${expence} - Item: ${item} - Category: ${category}`));


    }
    catch (err) {
        console.log(err.message)
        await t.rollback();
        res.status(500)
            .json({ Success: false, msg: "Server Error" })
    }
}






// ---------------------------------------------------------- Get All Orders ----------------------------------------------------------------------


const getAllExpence = async (req, res, next) => {
    try {
        const allData = await User.findAll(); //Get Only raw Data
        //{where:{signUpId: req.user.id}}
        res.json(allData);
    }
    catch (err) {
        res.status(500)
            .send({ Success: false, Error: err.message })
        console.log(chalk.red(err.message));
    }
}






// // ---------------------------------------------------------- Delete Order ----------------------------------------------------------------------


const deleteExpence = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const t = await sequelize.transaction()
        const getexpence = await User.findOne({where:{id:userId},transaction: t})

        
        const deletedData = await User.destroy({
            where: {
                id: userId,
                signUpId: req.user.id
            },transaction: t
        })
        console.log(deletedData);
        if (deletedData === 0) {
            return res
                .status(404)
                .json({ success: false, msg: 'You not able to delete another data ' })
        }
        const totalexpence = Number(req.user.totalexpence) - Number(getexpence.expence)
        await signUpdb.update({totalexpence:totalexpence},{where:{id:req.user.id},transaction: t})
        await t.commit()

        res.status(200)
            .json({ status: true, msg: "Expence Successfully Deleted" })
        console.log(chalk.red(`Expence Successfully Deleted`));
    }

    catch (err) {
        //console.log(err.message)
        await t.rollback();
        res.status(500)
            .json({ Success: false, msg: "Server Error" })
    }
}


// ---------------------------------------------------------- EXPORTS ----------------------------------------------------------------------

module.exports = { postAddExpence, getAllExpence, deleteExpence }




