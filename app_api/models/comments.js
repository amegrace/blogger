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

mongoose.model('blogger', commentSchema);
