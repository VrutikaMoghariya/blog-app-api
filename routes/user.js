var express = require('express');
var router = express.Router();


const userController = require('../controller/users');


/*_______________________________  User Authentication ___________________________________ */


/******  User Register ******/

router.post('/register', userController.createUser);


/****** User Login  ******/

router.post('/login', userController.loginUser);


/******  Get  ******/

router.get('/get-user', userController.getUser);


/******  Update ******/

router.post('/update-user', userController.updateUser);


/******  Delete ******/

router.delete('/delete-user', userController.deleteUser);


module.exports = router;