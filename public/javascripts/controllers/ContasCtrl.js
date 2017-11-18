angular.module('upfinancas').controller('ContasCtrl', [
	/*injections*/
	'$scope',
	'$stateParams',
	'contas',
	'auth',
	'header',
	'msg',
	'$uibModal',
	function($scope, $stateParams, contas, auth,header,msg,$uibModal){

		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.contas=contas.contas;

		$scope.paginaAtual = 0;
		$scope.paginaTamanho = 5;

		header_lista();

		$scope.numeroDePaginas=function(){
			return Math.ceil($scope.contas.length/$scope.paginaTamanho);                
		}

		function header_nova_conta(){
			header.values("Contas","crie uma nova conta rapidamente informando um nome e se ela será a primeira a ser listada no momento dos lançamentos no campo principal.",'<li><a href="/#/contas"><i class="fa fa-money"></i>Contas</a></li>');
		}

		function header_lista(){
			header.values("Contas","lista de contas cadastradas.",'<li><a href="/#/contas"><i class="fa fa-money"></i>Contas</a></li>');
		}

		function header_editar_conta(){
			header.values("Contas","altere sua conta rapidamente informando um nome e se ela será a primeira a ser listada no momento dos lançamentos no campo principal.",'<li><a href="/#/contas"><i class="fa fa-money"></i>Contas</a></li>');
		}

		$scope.novaConta=function(){
			$scope.conta={};
			msg.clear();
			header_nova_conta();

		}
		
		$scope.voltarLista=function(){
			$scope.conta=null;
			msg.clear();
			header_lista();
		}

		$scope.salvarConta=function(isValid){
			//msg.clear();

		    // check to make sure the form is completely valid
		    if ($scope.contaForm.$valid) {
				alert('our form is amazing');
			}
			else{
				alert('eroo');
			}
			/*
			if($scope.conta.nome === '' || $scope.conta.padrao === '' ) { return; }
			contas.salvar({
				_id:$scope.conta._id,
				nome: $scope.conta.nome,
				padrao: $scope.conta.padrao,
			}).success(function(conta) {
				//$scope.contas.push(conta);
				msg.success("Conta "+ conta.nome+" salva com sucesso.");
				$scope.conta=null;
			}).error(function(err){
				msg.error(err);
			});*/

			
		}

		$scope.atualizarStatus=function(conta){
			msg.clear();
			

			$uibModal.open({
				component: "questaoModal",
				resolve: {
					modalTitulo: function(){
						return "Alteração de status da conta "+ conta.nome;
					},
		            modalTexto: function() {
		            	return "Deseja realmente "+(conta.status==1?"desativar":"ativar") + " esta conta?";
		            }
		        }
			}).result.then(function() {
				if(conta.status==1){
					conta.status=2;
				}
				else{
					conta.status=1;
				}

				contas.salvar({
					_id:conta._id,
					nome: conta.nome,
					padrao: conta.padrao,
					status: conta.status
				}).success(function(conta) {
					//$scope.contas.push(conta);
					msg.success("Conta "+ conta.nome+" atualizada com sucesso.");
					$scope.conta=null;
				}).error(function(err){
					msg.error(err);
				});
			}, function() {
				console.info("Modal fechado");
			});
		}

		$scope.editarConta=function(conta){
			$scope.conta=conta;
			msg.clear();
			header_editar_conta();

		}

		$scope.removerConta=function(conta){
			msg.clear();

			$uibModal.open({
				component: "questaoModal",
				resolve: {
					modalTitulo: function(){
						return "Apagar conta "+ conta.nome;
					},
		            modalTexto: function() {
		            	return "Deseja realmente apagar esta conta? Todos os lançamentos referentes à ela serão apagados.";
		            }
		        }
			}).result.then(function() {
				contas.deletar(conta).success(function(conta) {
					//$scope.contas.push(conta);
					msg.success("Conta "+ conta.nome+" deletada com sucesso.");
				}).error(function(err){
					msg.error(err);
				})
			}, function() {
				console.info("Modal fechado");
			});

			
		}

		$scope.verificarStatus=function(status){
			return (status==1);
		}


	}]
	);

