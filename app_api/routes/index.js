var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blog');

router.get('/blogs/', ctrlBlogs.blogInfo);
router.get('/blogs/:_id', ctrlBlogs.blogInfoOfOne);
router.post('/blogs/', ctrlBlogs.blogCreate);
router.put('/blogs/:_id', ctrlBlogs.blogUpdateOne);
router.delete('/blogs/:_id', ctrlBlogs.blogDeleteOne);

module.exports = router;
