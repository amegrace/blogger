var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Home Page  */
router.get('/', ctrlHome.home);

/* Blog Page */
router.get('/bloglist', ctrlBlog.bloglist);
router.get('/blogadd', ctrlBlog.blogadd);
router.get('/blogedit/:blogId', ctrlBlog.edit);
router.get('/blogdelete/:blogId', ctrlBlog.del);
router.post('/blogadd', ctrlBlog.add);
router.post('/blogedit/:blogId', ctrlBlog.editPut);
router.post('/blogdelete/:blogId', ctrlBlog.blogDelete);

module.exports = router;
