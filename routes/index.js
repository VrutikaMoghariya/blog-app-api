var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');


const blogController = require('../controller/blog');



/*_______________________________  CRUD OF BLOG _______________________________________ */

/******  Create ******/

router.post('/create-blog', upload.single('img'), auth, blogController.createBlog);


/******  Get ******/

router.get('/get-blog', blogController.getBlog);


/******  Get ******/

router.get('/search', blogController.searchBlog);


/******  Get by User ******/

router.get('/get-user-blog', auth, blogController.getuserBlog);


/******  Update ******/

router.post('/update-blog', upload.single('img'), auth, blogController.updateBlog);


/******  Delete ******/

router.delete('/delete-blog', auth, blogController.deleteBlog);


module.exports = router;
