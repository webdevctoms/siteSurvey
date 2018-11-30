const validator = require("email-validator");

let CheckSurvey = function(req,res,next){
	const requestFields = Object.keys(req.body).length;
	console.log("first console log ",requestFields,req.body);
	const requiredFields = ["questions","answers","email"];
	const checkMissingField = requiredFields.find(field => !(field in req.body));
	const checkStringField = requiredFields.find(field => {
		if(field === "questions" || field === "answers"){
			if(Array.isArray(req.body[field])){
				return false;
			}
			else{

				return true;
			}
		}
		else if(field === "email"){
			if(typeof req.body[field] === 'string'){
				return false;
			}
			else{
				return true;
			}
		}
	}); 
	const checkInField = Object.keys(req.body).find(field => {
		//console.log(field);
		if(requiredFields.includes(field)){
			return false;
		}
		else{
			return true;
		}
	});
	const checkEmail = validator.validate(req.body.email);
	if(checkMissingField){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Missing Field"
		});
	}

	if(checkStringField){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Not String"
		});
	}
	if(checkInField){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Not in"
		});
	}
	if(!checkEmail){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"incorrect email"
		});
	}
	if(requestFields !== 3){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Extra Field"
		});
	}
	console.log("finished check survey");
	next();
};

module.exports = {CheckSurvey};