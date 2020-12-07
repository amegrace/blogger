var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var ctrlBlogs = require('../controllers/blogs');
var ctrlComments = require('../controllers/comments');
var ctrlAuth = require('../controllers/authentication');

router.get('/blogs/', ctrlBlogs.blogInfo);
router.get('/blogs/:blogId', ctrlBlogs.blogInfoOfOne);
router.post('/blogs/', auth, ctrlBlogs.blogCreate);
router.put('/blogs/:blogId', auth, ctrlBlogs.blogUpdateOne);
router.delete('/blogs/:blogId', auth, ctrlBlogs.blogDeleteOne);

router.post('/blogs/:blogId', auth, ctrlComments.commentsCreate);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
