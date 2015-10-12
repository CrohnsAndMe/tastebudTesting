
var user = require('./models/user');
module.exports = function(app){
	app.get('/', function(req,res){
		res.send("HELLO WORLD");
	});

	app.get('/:username/:password', function(req,res){
		var newUser = new user();
		newUser.username = req.params.username;
		newUser.password = req.params.password;
		console.log(newUser.username + " " + newUser.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.send("SUCCESS");
	})
}