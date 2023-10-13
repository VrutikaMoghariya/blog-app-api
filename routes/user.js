var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../middleware/auth');
var userController = require('../controller/users');


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


/******  Google login ******/


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`https://blog-app-ui-6prm.onrender.com/gmail/login?token=${req.authInfo}`);
    });


module.exports = router;