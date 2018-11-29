const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	username:{type:String,required:true,unique:true},
	password:{type:String,required:true}
});

userSchema.methods.serialize = function(){
	return{
		username:this.username
	}
};

userSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password,this.password);
};

userSchema.statics.hashPassword = function(password){
	return bcrypt.hash(password,12);
};

const User = mongoose.model("User",userSchema);

module.exports = {User};