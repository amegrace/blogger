var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
	blog_title: String,
	blog_text: String,
	created_on: {
		type: Date,
		"default": Date.now
	}
});

mongoose.model('blogger', blogSchema);
