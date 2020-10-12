var mongoose = require('mongoose');
var Blog = mongoose.model('blogger');
var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

/* GET blog by id */
module.exports.blogInfoOfOne = function(req, res) {
	console.log('Finding blog details', req.params);
	if (req.params && req.params.blogId) {
		Blog
			.findById(req.params.blogId)
			.exec(function(err, location) {
				if (!location) {
					sendJSONresponse(res, 404, {
						"message": "blogId not found"
					});
					return;
				} else if (err) {
					console.log(err);
					sendJSONresponse(res, 404, err);
					return;
				}
				console.log(location);
				sendJSONresponse(res, 200, location);
			});
	} else {
		console.log('No blogId specified');
		sendJSONresponse(res, 404, {
			"message": "No blogId in request"
		});
	}
};

/* GET list of all blogs */
module.exports.blogInfo = function(req, res){
	console.log('Getting blog list');
	Blog
		.find()
		.exec(function(err, results){
			if(!results){
				sendJSONresponse(res, 404, {
					"message": "no blogs found"	
				});
				return;
			} else if(err){
				console.log(err);
				sendJSONresponse(res, 404, err);
				return;
			}
			console.log(results);
			sendJSONresponse(res, 200, buildBlogList(req, res, results));
		});
};

var buildBlogList = function(req, res, results){
	var blogs = [];
	results.forEach(function(obj){
		blogs.push({
			blog_title: obj.blog_title,
			blog_text: obj.blog_text,
			created_on: obj.created_on
		});
	});
	return blogs;
};

/* POST new blog */
module.exports.blogCreate = function(req, res){
	console.log(req.body);
	Blog
		.create({
			blog_title: req.body.blog_title,
			blog_text: req.body.blog_text,
			created_on: req.body.created_on
		}, function(err, location){
			if(err){
				console.log(err);
				sendJSONresponse(res, 400, err);
			} else{
				console.log(location);
				sendJSONresponse(res, 201, location);
			}
		}
		);
};

/* Update one blog */
module.exports.blogUpdateOne = function(req, res){
	console.log("Updating a blog with id of " + req.params.blogId);
	console.log(req.body);
	Blog
		.findOneAndUpdate(
			{ _id: req.params.blogId},
			{ $set: {"blog_title": req.body.blog_title, "blog_text": req.body.blog_text, "created_on": req.body.created_on}},
			function(err, response){
				if(err){
					sendJSONresponse(res, 400, err);
				} else{
					sendJSONresponse(res, 201, response);
				}
			}
		);
};

/* Delete one blog */
module.exports.blogDeleteOne = function(req, res){
	console.log("Deleting blog with id of " + req.param.blogId);
	console.log(req.body);
	Blog
		.findByIdAndRemove(req.params.blogId)
		.exec (
			function(err, response){
				if(err){
					sendJSONresponse(res, 404, err);
				} else{
					sendJSONresponse(res, 204, null);
				}
			}
		);
};
