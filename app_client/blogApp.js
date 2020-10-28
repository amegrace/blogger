var app = angular.module('blogApp', ['ngRoute', 'ui.router']);

/** Router Provider **/
app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateURL: 'pages/home.html',
				controller: 'HomeController',
				controllerAs: 'vm'
		})

		.when('/bloglist', {
			templateURL: 'pages/bloglist.html',
				controller: 'ListController',
				controllerAs: 'vm'
		})

		.when('/blogadd', {
			templateURL: 'pages/blogadd.html',
				controller: 'AddController',
				controllerAs: 'vm'
		})
		
		.when('/blogedit/:blogId', {
			templateURL: 'pages/blogedit.html',
				controller: 'EditController',
				controllerAs: 'vm'
		})

		.when('/blogdelete/:blogId', {
			templateURL: 'pages/blogdelete.html',
				controller: 'DeleteController',
				controllerAs: 'vm'
		})

	.otherwise({redirectTo: '/'});
});

/** State Provider **/
app.config(function($stateProvider) {
	$stateProvider
		.state('bloglist', {
			url: '/bloglist',
			templateUrl: 'pages/bloglist.html',
			controller: 'ListController'
		});
});

/** REST Web API functions **/
function blogInfo($http) {
	return $http.get('/api/blogs');
}

function blogInfoOfOne($http, blogId) {
	return $http.get('/api/blogs/' + blogId);
}

function blogCreate($http, data){
	return $http.get('/api/blogs/', data);
}

function blogUpdateOne($http, blogId, data) {
	return $http.get('/api/blogs/' + blogId, data);
}

function blogDeleteOne($http, blogId) {
	return $http.get('/api/blogs/' + blogId);
}

/** Controllers **/
app.controller('HomeController', function HomeController(){
	var vm = this;
	vm.pageHeader = {
		title: "Amelia Spanier Blog Site"
	};
	vm.message = "Welcome to my blog!";
});

app.controller('ListController', function ListController($http){
	var vm = this;
	vm.pageHeader = {
		title: 'Blog List'
	};

	blogInfo($http)
		.success(function(data) {
			vm.blogs = data;
			vm.message = "Blog info found";
		})
		.error(function (e) {
			vm.message = "Could not get blog list";
		});
});

app.controller('AddController', [ '$http', '$roteParams', '$state', function AddController($http, $routeParams, $state){
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: 'Blog Add'
	};

	vm.submit = function() {
		var data = vm.blog;
		data.blog_title = userForm.blog_title.value;
		data.blog_text = userForm.blog_text.value;

		blogCreate($http, data)
			.success(function(data) {
				vm.message = "Blog added";
				$state.go('bloglist');
			})
			.error(function (e){
				vm.message = "Could not add blog";
			});
	}

}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.blogId = $routeParams.blogId;
	vm.pageHeader = {
		title: 'Blog Edit'
	};

	blogInfoOfOne($http, vm.blogId)
		.success(function(data){
			vm.blog = data;
			vm.message = "Blog data found!"
		})
		.error(function(e) {
			vm.message = "Could not get blog given id of " + vm.blogId;
		});

	vm.submit = function() {
		var data = vm.blog;
		data.blog_title = userForm.blog_title.value;
		data.blog_text = userForm.blog_text.value;

		blogUpdateOne($http, vm.blogId, data)
			.success(function(data) {
				vm.message = "Blog data updated";
				$state.go('bloglist');
			})
			.error(function (err){
				vm.message = "Could not update blog given id of " + vm.blogId + userForm.blog_title.text + " " + userForm.blog_text.text;
			});
	}
}]);

app.controller('DeleteController', ['$http', '$routeParams', '$state', function DeleteController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.blogId = $routeParams.blogId;
	vm.pageHeader = {
		title: 'Blog Delete'
	};

	blogInfoOfOne($http, vm.blogId)
		.success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found";
		})
		.error(function(e) {
			vm.message = "Could not get book given id of " + vm.blogId;
		});
		
	vm.submit = function(){
		var data = {};
		blogDeleteOne($http, vm.blogId)
			.success(function(){
				vm.message = "Blog deleted";
				$state.go('bloglist');
			})
			.error(function(e){
				vm.message = "Could not delete blog given id of " + vm.blogId + userForm.blog_title.text + " " + userForm.blog_text.text;
			});
	}
	vm.cancel = function() {
		$state.go('bloglist');
	}
}]);
