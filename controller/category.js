const CATEGORY = require('../model/category');

// Create - Category

exports.createCategory = async function (req, res, next) {

    try {
        console.log(req.body);
        const createCategory = await CATEGORY.create(req.body);
        res.status(201).json({
            status: "Success",
            msg: "Category Create Successfully",
            data: createCategory
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not Create Successfully",
            data: error
        })
    }
}


// Get - Category

exports.getCategory = async function (req, res, next) {

    try {
        const getCategory = await CATEGORY.find();
        res.status(200).json({
            status: "Success",
            msg: "Category get Successfully",
            data: getCategory
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not get Successfully",
            data: error
        })
    }
}


// Update - Category

exports.updateCategory = async function (req, res, next) {
    try {
        console.log(req.body.name);
        const data = await CATEGORY.findByIdAndUpdate(req.query._id , req.body);
        res.status(200).json({
            status: "Success",
            msg: "Category Update Successfully",
            data : data
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not Update Successfully",
            data: error,
        })
    }
}


// Delete - Category

exports.deleteCategory = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "Category Delete Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg:"Category not Delete Successfully" ,
            data : error
        })
    }
}