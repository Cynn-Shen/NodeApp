
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/MyTestDB');

var RegisterSchema =  new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	passwordConf: {
		type: String,
		required: true,
	}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

RegisterSchema.methods.addRegister = function(register, callback) {
	this.email = register.email;
	this.password = register.password;
	this.passwordConf = register.passwordConf;
	this.save(callback);
}
//authenticate input against database
RegisterSchema.statics.authenticate = function (email, password, callback) {
  Register.findOne({ email: email }, function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
	  if(password == user.password){
		  return callback(null, user);
	  }	else {
          return callback();
      }
    });
}

var Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;
