var app = angular.module('blogApp', ['ngRoute', 'ui.router']);

/** Router Provider **/
app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
				controller: 'HomeController',
				controllerAs: 'vm'
		})
		.when('/bloglist', {
			templateUrl: 'pages/bloglist.html',
				controller: 'ListController',
				controllerAs: 'vm'
		})

		.when('/blogadd', {
			templateUrl: 'pages/blogadd.html',
				controller: 'AddController',
				controllerAs: 'vm'
		})
		
		.when('/blogedit/:blogId', {
			templateUrl: 'pages/blogedit.html',
				controller: 'EditController',
				controllerAs: 'vm'
		})

		.when('/blogdelete/:blogId', {
			templateUrl: 'pages/blogdelete.html',
				controller: 'DeleteController',
				controllerAs: 'vm'
		})
		
		.when('/login', {
			templateUrl: 'common/auth/login.view.html',
				controller: 'LoginController',
				controllerAs: 'vm'
		})

		.when('/register', {
			templateUrl: 'common/auth/register.view.html',
				controller: 'RegisterController',
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

function blogCreate($http, authentication, data){
	return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function blogUpdateOne($http, authentication, blogId, data) {
	return $http.put('/api/blogs/' + blogId, data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function blogDeleteOne($http, authentication, blogId) {
	return $http.delete('/api/blogs/' + blogId, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

/** Controllers **/
app.controller('HomeController', function HomeController(){
	var vm = this;
	vm.pageHeader = {
		title: "Amelia Spanier Blog Site"
	};
	vm.message = "Welcome to my blog!";
});

app.controller('ListController', ['$http', 'authentication', function ListController($http, authentication){
	var vm = this;
	vm.pageHeader = {
		title: 'Blog List'
	};

	vm.isLoggedIn = function(){
		return authentication.isLoggedIn();
	};

	vm.getEmail = function(){
		return authentication.currentUser().email;
	};

	blogInfo($http)
		.success(function(data) {
			vm.blogs = data;
			vm.message = "Blog info found";
		})
		.error(function (e) {
			vm.message = "Could not get blog list";
		});
}]);

app.controller('AddController', [ '$http', '$routeParams', '$state', 'authentication', function AddController($http, $routeParams, $state, authentication){
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: 'Blog Add'
	};

	vm.submit = function() {
		var data = vm.blog;
		data.blog_title = userForm.blog_title.value;
		data.blog_text = userForm.blog_text.value;
		data.blog_author = authentication.currentUser().name;
		data.author_email = authentication.currentUser().email;

		blogCreate($http, authentication, data)
			.success(function(data) {
				vm.message = "Blog added";
				$state.go('bloglist');
			})
			.error(function (e){
				vm.message = "Could not add blog";
			});
	}

}]);

app.controller('EditController', [ '$http', '$routeParams', '$state', 'authentication', function EditController($http, $routeParams, $state, authentication) {
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

		blogUpdateOne($http, authentication, vm.blogId, data)
			.success(function(data) {
				vm.message = "Blog data updated";
				$state.go('bloglist');
			})
			.error(function (e){
				vm.message = "Could not update blog given id of " + vm.blogId + userForm.blog_title.text + " " + userForm.blog_text.text;
			});
	}
}]);

app.controller('DeleteController', ['$http', '$routeParams', '$state', 'authentication', function DeleteController($http, $routeParams, $state, authentication) {
	var vm = this;
	vm.blog = {};
	vm.blogId = $routeParams.blogId;
	vm.pageHeader = {
		title: 'Blog Delete'
	};

	blogInfoOfOne($http,vm.blogId)
		.success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found";
		})
		.error(function(e) {
			vm.message = "Could not get book given id of " + vm.blogId;
		});
		
	vm.submit = function(){
		var data = {};
		blogDeleteOne($http, authentication, vm.blogId)
			.success(function(data){
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
