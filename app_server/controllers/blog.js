var request = require('request');
var apiOptions = {
	server: "http://35.153.170.48:80"
};
var _showError = function(req, res, status){
	var title, content;
	if(status === 404){
		title = "404, page not found";
		content = "Page could not be found. Sorry!";
	} else{
		title = status + ", something went wrong!";
		content = "Something has gone wrong with this page.";
	}
	res.status(status);
	res.render('generic-text', {
		title: title,
		content: content
	});
};
/* GET 'blog list' page */
module.exports.bloglist = function(req, res){
	var requestOptions, path;
	path = '/api/blogs/';
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogList(req, res, body);
		}
	);
};

/* Render 'blog list' page */
var renderBlogList = function(req, res, responseBody){
	res.render('bloglist', {
		title: 'Blog List', 		
		blogs: responseBody
	});

};

/* Render 'blog add' page */
module.exports.blogadd = function(req, res){
	res.render('blogadd', {title: 'Blog Add'});
};

/* Add Blog Post */
module.exports.add = function(req, res){
	var requestOptions, path, postdata;
	path = '/api/blogs/';

	postdata = {
		blog_title: req.body.blog_title,
		blog_text: req.body.blog_text,
		created_on: req.body.created_on
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 201){
				res.redirect('/bloglist');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};

/* Blog Edit */
module.exports.edit = function(req, res){
	var requestOptions, path;
	path = '/api/blogs/' + req.params.blogId;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogEdit(req, res, body);
		}
	);
};

/* Render 'blog edit' page */
var renderBlogEdit = function(req, res, responseBody){
	res.render('blogedit', {
		title: 'Blog Edit',
		blog: responseBody
	});
};

/* PUT Blog Edit */
module.exports.editPut = function(req, res){
	var requestOptions, path, postdata;
	var id = req.params.blogId;
	path = '/api/blogs/' + id;

	postdata = {
		_id: id,
		blog_title: req.body.blog_title,
		blog_text: req.body.blog_text,
		created_on: req.body.created_on
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "PUT",
		json: postdata
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 201){
				res.redirect('/bloglist');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};

/* Delete blog */
module.exports.del = function(req, res){
	var requestOptions, path;
	path = '/api/blogs/' + req.params.blogId;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogDelete(req, res, body);
		});
};

/*Render 'blog delete' page */
var renderBlogDelete = function(req, res, responseBody){
	res.render('blogdelete',{
		title: 'Blog Delete',
		blog: responseBody
	});
};

/* DELETE blog */
module.exports.blogDelete = function(req, res){
	var requestOptions, path;
	var id = req.params.blogId;
	path = '/api/blogs/' + id;

	requestOptions = {
		url: apiOptions.server + path,
		method: "DELETE",
		json: {}
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 204){
				res.redirect('/bloglist');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};
