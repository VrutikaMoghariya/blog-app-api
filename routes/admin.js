var express = require('express');
var router = express.Router();

const adminController = require('../controller/admin');

/*_______________________________  Admin Authentication_______________________________________ */

/******  Admin Register ******/

router.post('/admin-register', adminController.createAdmin);


/******  Admin Login  ******/

router.post('/admin-login', adminController.loginAdmin);


/******  Get Admin ******/

router.get('/get-admin', adminController.getAdmin);


module.exports = router;