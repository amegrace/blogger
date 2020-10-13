var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs/', ctrlBlogs.blogInfo);
router.get('/blogs/:blogId', ctrlBlogs.blogInfoOfOne);
router.post('/blogs/', ctrlBlogs.blogCreate);
router.put('/blogs/:blogId', ctrlBlogs.blogUpdateOne);
router.delete('/blogs/:blogId', ctrlBlogs.blogDeleteOne);

module.exports = router;
