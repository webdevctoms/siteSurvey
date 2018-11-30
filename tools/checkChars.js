const {KEY} = require('../config');

let CheckChars = function(req,res,next){
	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\-\+\*.,?!;\s']*$/;
	let check;
	const checkCharacters = Object.keys(req.body).find(key =>{
		if(key === "email"){
			return false;
		}
		check = legalChars.test(req.body[key]);
		if(!check){
			return req.body[key];
		}
	});
	console.log(checkCharacters);
	if (checkCharacters){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkCharacters
		});
	}
	else{
		next();
	}

};

let CheckKey = function(req,res,next){
	if(req.body.KEY !== KEY){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"IllegalCharacter"
		});
	}
	else{
		next();
	}
};

module.exports = {CheckChars,CheckKey};