const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
	uid: {type:Number},
	questions: {type:Array},
	answers: {type:Array},
	email: {type:String, unique:true}
});

surveySchema.methods.serialize = function(){
	return{
		questions:this.questions
	}
};

const SurveyData = mongoose.model("SurveyData",surveySchema);

module.exports = {SurveyData};