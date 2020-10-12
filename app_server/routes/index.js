var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Home Page  */
router.get('/', ctrlHome.home);

/* Blog Page */
router.get('/bloglist', ctrlBlog.bloglist);
router.get('/blogadd', ctrlBlog.blogadd);
router.get('/blogedit/:_id', ctrlBlog.edit);
router.get('/blogdelete/:_id', ctrlBlog.del);
router.post('/blogadd', ctrlBlog.add);
router.put('/blogedit/:_id', ctrlBlog.editPut);
router.delete('/blogdelete/:_id', ctrlBlog.blogDelete);

module.exports = router;
