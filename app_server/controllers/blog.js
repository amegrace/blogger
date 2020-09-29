/* GET 'blog list' page */
module.exports.bloglist = function(req, res){
	res.render('bloglist', {
		title: 'Blog List',
		blogs:[{
			blog_title: 'Busy Saturday',
			blog_text: "Help"
		},{
			blog_title: 'Self-Care Sunday',
			blog_text: "Me"
		},{
			blog_title: 'Monday Madness',
			blog_text: "Please"
		}]
	});
};

/* GET 'blog add' page */
module.exports.blogadd = function(req, res){
	res.render('blogadd', {title: 'Blog Add'});
};

/* GET 'blog edit' page */
module.exports.blogedit = function(req, res){
	res.render('blogedit', {title: 'Blog Edit'});
};

/* GET 'blog delete' page */
module.exports.blogdelete = function(req, res){
	res.render('blogdelete',{title: 'Blog Delete'});
};
