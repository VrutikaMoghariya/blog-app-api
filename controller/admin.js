const ADMIN = require('../model/admin');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// Create - Admin

exports.createAdmin = async function (req, res, next) {

    try {

        req.body.password = await bcrypt.hash(req.body.password, 10);  // hash the password

        const createAdmin = await ADMIN.create(req.body);

        // return success if the new Admin is added to the database successfully
        res.status(201).json({
            status: "Success",
            msg: "Admin Create Successfully",
            data: createAdmin,
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Admin not Create Successfully",
            data: error
        })
    }
}


// Login - Admin

exports.loginAdmin = async function (req, res, next) {

    try {
        const admin = await ADMIN.findOne({email: req.body.email });

        // compare the password entered and the hashed password found
        const isMatch = await bcrypt.compare(req.body.password, admin.password);

        if (isMatch) {
            const token = jwt.sign({adminId: admin._id}, "RANDOM-TOKEN");     //   create JWT token
            res.status(200).json({                                             //   return success response
                status : "Success",
                msg: "Admin Login Successfully",
                data: admin,
                token : token,
            });
        } else {
            res.status(400).json({
                msg: "Password does not Match"
            });
        }
        
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Admin not Found",
            data: error
        });
    }
}


//Get Admin

exports.getAdmin = async function (req, res, next) {

    try {
        const getAdmin = await ADMIN.find();
        res.status(200).json({
            status: "Success",
            msg: "Admin get Successfully",
            data: getAdmin
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Admin not get Successfully",
            data: error
        })
    }
}