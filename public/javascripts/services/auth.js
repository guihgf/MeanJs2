angular.module('upfinancas').factory('auth', ['$http', '$window','$state', function($http, $window,$state){
	var auth = {};

	auth.saveToken = function (token){
		$window.localStorage['upfinancas-token'] = token;
	};

	auth.getToken = function (){
		return $window.localStorage['upfinancas-token'];
	}

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			//$window.location.href = '/';
			return false;
		}
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user){
		return $http.post('/registrar', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user){
		return $http.post('/autenticar', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function(){
		$window.localStorage.removeItem('upfinancas-token');
		$state.go('login');
		//$window.location.href = '/';
	}

	return auth;
}]);