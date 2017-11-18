angular.module('upfinancas').filter('padrao',function(){ 
	return function(padrao){
		if(padrao==1){
			return "Não";
		}
		else{
			return "Sim";
		}
	}
});

angular.module('upfinancas').filter('status',function(){ 
	return function(status){
		if(status==1){
			return "Ativo";
		}
		else{
			return "Inativo";
		}
	}
});


angular.module('upfinancas').filter('inicioPaginacao', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});