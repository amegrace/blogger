var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
	blog_title: String,
	blog_text: String,
	created_on: {
		type: Date,
		"default": Date.now
	},
	blog_author: String,
	author_email: String
});

mongoose.model('blogger', blogSchema);
