angular.module('upfinancas').controller('MainCtrl', [
	'$scope',
	'posts',
	'auth',
	'header',
	function($scope,posts,auth,header){
		$scope.isLoggedIn = auth.isLoggedIn;

		header.values("Home","Bem vindo(a)!.",'<li><a href="/#/home"><i class="fa fa-home"></i>Home</a></li>');
	}]
); 