var express = require('express');
var router = express.Router();


const categoryController = require('../controller/category');



/*_____________________________  CRUD OF CATEGORY _____________________________________ */

/******  Create ******/

router.post('/create-category', categoryController.createCategory);


/******  Get ******/

router.get('/get-category', categoryController.getCategory);


/******  Update ******/

router.post('/update-category', categoryController.updateCategory);


/******  Delete ******/

router.delete('/delete-category', categoryController.deleteCategory);




module.exports = router;
