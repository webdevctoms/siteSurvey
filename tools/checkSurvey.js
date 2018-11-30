let CheckSurvey = function(req,res,next){
	const requestFields = Object.keys(req.body).length;
	console.log(requestFields,req.body);
	const requiredFields = ["questions","answers","email"];
	const checkMissingField = requiredFields.find(field => !(field in req.body));
	const checkStringField = requiredFields.find(field => field in req.body && typeof req.body[field] !== 'string'); 
	const checkInField = Object.keys(req.body).find(field => {
		//console.log(field);
		if(requiredFields.includes(field)){
			return false;
		}
		else{
			return true;
		}
	});
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
	if(requestFields !== 3){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Extra Field"
		});
	}

	next();
};

module.exports = {CheckSurvey};