var mongoose = require('mongoose');
var Blog = mongoose.model('blogger');
var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.commentsCreate = function(req, res){
	if(req.params.blogId){
		Blog
			.findById(req.params.blogId)
			.select('comments')
			.exec(
				function(err, location){
					if(err){
						sendJSONresponse(res, 400, err);
					}
					else{
						addComment(req, res, location);
					}
				}
			);
	}
	else{
		sendJSONresponse(res, 404, {
			"message": "Blog not found"
		});
	}
};

var addComment = function(req, res, location){
	if(!location){
		sendJSONresponse(res, 404, {
			"message": "Blog not found"
		});
	}
	else{
		location.comments.push({
			comment_text: req.body.comment_text,
			created_on: req.body.created_on,
			comment_author: req.body.comment_author,
			author_email: req.body.author_email
		});
		location.save(function(err, location){
			var thisComment;
			if(err){
				sendJSONresponse(res, 400, err);
			}
			else{
				thisComment = location.comments[location.comments.length - 1];
				sendJSONresponse(res, 201, thisComment);
			}
		});
	}
	return;
};
