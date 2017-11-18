angular.module('upfinancas').factory('header',function($sce){
	var header={
		titulo:null,
		descricao:null,
		breadcrumb:null,
		observerCallbacks:[]
	};

	header.values = function(titulo,descricao,breadcrumb) {
		header.titulo=titulo;
		header.descricao=descricao;
		header.breadcrumb=$sce.trustAsHtml(breadcrumb);

		notifyObservers();
	};

	header.registerObserverCallback = function(callback){
		header.observerCallbacks.push(callback);
	};

	var notifyObservers = function(){
		angular.forEach(header.observerCallbacks, function(callback){
			callback();
		});
	};
	
	return header;
});