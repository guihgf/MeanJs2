angular.module('upfinancas').controller('ParticipantesCtrl', [
	/*injections*/
	'$scope',
	'$stateParams',
	'participantes',
	'auth',
	'msg',
	function($scope, $stateParams, participantes, auth,msg){

		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.participantes=participantes.participantes;

		$scope.paginaAtual = 0;
	    $scope.paginaTamanho = 5;

	    $scope.numeroDePaginas=function(){
	        return Math.ceil($scope.participantes.length/$scope.paginaTamanho);                
	    }

		$scope.novoParticipante=function(){
			$scope.participante={};
			msg.clear();
		}
		
		$scope.voltarLista=function(){
			$scope.participante=null;
			msg.clear();
		}

		$scope.salvarParticipante=function(){
			msg.clear();
			if($scope.participante.nome === '' ) { return; }
			participantes.salvar({
				_id:$scope.participante._id,
				nome: $scope.participante.nome,
				telefone: $scope.participante.telefone,
				celular: $scope.participante.celular,
				email: $scope.participante.email,
				site: $scope.participante.site,
				rua: $scope.participante.rua,
				bairro: $scope.participante.bairro,
				complemento: $scope.participante.complemento,
				cidade: $scope.participante.cidade
			}).success(function(participante) {
				//$scope.participantes.push(conta);
				msg.success("Participante "+ participante.nome+" salvo com sucesso.");
				$scope.participante=null;
			}).error(function(err){
				msg.error(err);
			});

			
		}

		$scope.atualizarStatus=function(participante){
			msg.clear();
			if(participante.status==1){
				participante.status=2;
			}
			else{
				participante.status=1;
			}

			participantes.salvar({
				_id: participante._id,
				nome: participante.nome,
				telefone: participante.telefone,
				celular: participante.celular,
				email: participante.email,
				site: participante.site,
				rua: participante.rua,
				bairro: participante.bairro,
				complemento: participante.complemento,
				cidade: participante.cidade,
				status:participante.status
			}).success(function(participante) {
				//$scope.participantes.push(conta);
				msg.success("Participante "+ participante.nome+" atualizado com sucesso.");
				$scope.participante=null;
			}).error(function(err){
				msg.error(err);
			});
		}

		$scope.editarParticipante=function(participante){
			$scope.participante=participante;
			msg.clear();

		}

		$scope.removerParticipante=function(participante){
			msg.clear();
			participantes.deletar(participante).success(function(participante) {
				//$scope.participantes.push(conta);
				msg.success("Participante "+ participante.nome+" deletado com sucesso.");
			}).error(function(err){
				msg.error(err);
			})
		}

		$scope.verificarStatus=function(status){
			return (status==1);
		}


	}]
);