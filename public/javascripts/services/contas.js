angular.module('upfinancas').factory('contas', ['$http','auth',function($http,auth){
	var o={
		contas:[]
	};

	o.listar = function() {
		return $http.get('/contas').success(function(data){
			angular.copy(data, o.contas);
		});
	};

	o.salvar = function(conta) {
		if(conta._id==null){
			return $http.post('/contas', conta)
			.success(function(data){
				//aqui chamo novamente o listar, pois alguns itens da lista sofrem alteração com o novo cadastro
				o.listar();
				//o.contas.push(contas);
			});
		}
		else{
			return $http.put('/contas', conta)
			.success(function(data){
				//aqui chamo novamente o listar, pois alguns itens da lista sofrem alteração com o novo cadastro
				o.listar();
				//o.contas.push(contas);
			});
		}
		
	};

	o.deletar=function(conta){
		return $http.delete('/contas/'+conta._id).success(function(data){
			angular.copy((o.contas.filter(item=>item._id!==conta._id)), o.contas);
		});
	}
	
	return o;
}]);