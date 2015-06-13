var Model = require('./Model.js')

function User(){

	var userSchema ={
		username: String,
		password: String
	} 

	Model.call(this,userSchema);
	Model.extend(User);
}

module.exports = User;