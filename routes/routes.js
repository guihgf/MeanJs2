var jwt = require('express-jwt');
//middleware
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports=function(app){

	var usuario=app.controllers.UsuarioCtrl;

	var conta=app.controllers.ContaCtrl;

	var participante=app.controllers.ParticipanteCtrl;

	//usuario
	app.route('/')
	.get(function(req,res){
		res.render('index.ejs');
	});

	app.route('/registrar')
	.post(usuario.cadastrar);

	app.route('/autenticar')
	.post(usuario.autenticar);

	//conta
	app.route('/contas')
	.post(auth,conta.salvar)
	.put(auth,conta.salvar)
	.get(auth,conta.listar);

	app.route('/contas/:id')
	.delete(auth,conta.remover);

	//participante
	app.route('/participantes')
	.post(auth,participante.salvar)
	.put(auth,participante.salvar)
	.get(auth,participante.listar);

	app.route('/participantes/:id')
	.delete(auth,participante.remover);



}