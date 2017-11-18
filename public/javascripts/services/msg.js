angular.module('upfinancas').factory('msg',function(){
	var messages={
		ok:null,
		err:null,
		observerCallbacks:[]
	};

	messages.success = function(msg) {
		messages.ok=msg;
		notifyObservers();
	};

	messages.error = function(msg) {
		messages.err=msg;
		notifyObservers();
	};

	messages.clear=function(){
		messages.error(null);
		messages.success(null);
	}

	messages.registerObserverCallback = function(callback){
		messages.observerCallbacks.push(callback);
	};

	var notifyObservers = function(){
		angular.forEach(messages.observerCallbacks, function(callback){
			callback();
		});
	};
	
	return messages;
});