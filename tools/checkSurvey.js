let CheckSurvey = function(req,res,next){
	const requestFields = Object.keys(req.body).length;

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