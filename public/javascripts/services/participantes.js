angular.module('upfinancas').factory('participantes', ['$http','auth',function($http,auth){
	var o={
		participantes:[]
	};

	o.listar = function() {
		return $http.get('/participantes').success(function(data){
			angular.copy(data, o.participantes);
		});
	};

	o.salvar = function(participantes) {
		if(participantes._id==null){
			return $http.post('/participantes', participantes)
			.success(function(data){
				//aqui chamo novamente o listar, pois alguns itens da lista sofrem alteração com o novo cadastro
				o.listar();
				//o.contas.push(contas);
			});
		}
		else{
			return $http.put('/participantes', participantes)
			.success(function(data){
				//aqui chamo novamente o listar, pois alguns itens da lista sofrem alteração com o novo cadastro
				o.listar();
				//o.contas.push(contas);
			});
		}
		
	};

	o.deletar=function(participante){
		return $http.delete('/participantes/'+participante._id).success(function(data){
			angular.copy((o.participantes.filter(item=>item._id!==participante._id)), o.participantes);
		});
	}
	
	return o;
}]);