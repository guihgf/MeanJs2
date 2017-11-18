angular.module('upfinancas')
.component('questaoModal', {
	template: `<div class="modal-content">
			      <div class="modal-header">
			        <button ng-click="$ctrl.handleDismiss()" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title">{{$ctrl.modalTitulo}}</h4>
			      </div>
			      <div class="modal-body">
			        <p>{{$ctrl.modalTexto}}</p>
			      </div>
			      <div class="modal-footer">
			      	<button type="button" class="btn btn-primary" ng-click="$ctrl.handleClose()">Sim</button>
			        <button type="button" class="btn btn-default" ng-click="$ctrl.handleDismiss()" >Não</button>
			      </div>
			    </div>
	`,
	bindings: {
		modalInstance: "<",
		resolve: "<"
	},
	controller: [function() {
		var $ctrl = this;
		$ctrl.modalTitulo = $ctrl.resolve.modalTitulo;
		$ctrl.modalTexto = $ctrl.resolve.modalTexto;
		$ctrl.handleClose = function() {
			$ctrl.modalInstance.close();
		};
		$ctrl.handleDismiss = function() {
			$ctrl.modalInstance.dismiss("cancel");
		};
	}]
});