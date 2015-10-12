var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		name: String,
		longitude: String,
		latitude: String
	});

module.exports = mongoose.model('locations', userSchema);