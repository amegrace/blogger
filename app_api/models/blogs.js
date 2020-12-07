var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	comment_text: String,
	created_on: {
		type: Date,
		"default": Date.now
	},
	comment_author: String,
	author_email: String
});

var blogSchema = new mongoose.Schema({
	blog_title: String,
	blog_text: String,
	created_on: {
		type: Date,
		"default": Date.now
	},
	blog_author: String,
	author_email: String,
	comments: [commentSchema]
});
mongoose.model('blogger', blogSchema);
