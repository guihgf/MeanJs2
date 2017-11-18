angular.module('upfinancas').controller('NavCtrl',  [
	'$scope',
	'auth',
	'msg',
	'header',
	function($scope, auth,msg,header){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;

		var updateMsg = function(){
		    $scope.success=msg.ok;
			$scope.error=msg.err;
	  	};

  		msg.registerObserverCallback(updateMsg);

		var updateHeader=function(){
			$scope.header=header;
		}

		header.registerObserverCallback(updateHeader);
	}]);