const USER = require('../model/users');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// Create-User

exports.createUser = async function (req, res, next) {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);  // hash the password

        const createUser = await USER.create(req.body);
        const token = jwt.sign({userId: createUser._id}, "RANDOM-TOKEN");

        // return success if the new user is added to the database successfully
        res.status(201).json({
            status: "Success",
            msg: "User Create Successfully",
            data: createUser,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Create Successfully",
            data: error
        })
    }
}

// Login-User

exports.loginUser = async function (req, res, next) {

    try {
        const user = await USER.findOne({ email: req.body.email });
        
        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            const token = jwt.sign({userId: user._id},"RANDOM-TOKEN");     // create JWT token
            res.status(200).json({                                          //return success response
                status:"Success",
                msg: "User Login Successfully",
                email: user.email,
                token: token
            });
        } else {
            res.status(400).json({
                msg: "Password does not Match"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Found",
            data: error
        })
    }
}


// Get - User

exports.getUser = async function (req, res, next) {

    try {
        const getUser = await USER.find();
        res.status(200).json({
            status: "Success",
            msg: "User get Successfully",
            data: getUser
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not get Successfully",
            data: error
        })
    }
}


// Update - User

exports.updateUser = async function (req, res, next) {

    try {
        await USER.findByIdAndUpdate(req.query._sid, req.body);
        res.status(200).json({
            status: "Success",
            msg: "User Update Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Update Successfully",
            data : error
        })
    }
}


// Delete - User

exports.deleteUser = async function (req, res, next) {
    try {
        await USER.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            msg: "User Delete Successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Delete Successfully",
            data: error,
        })
    }
}