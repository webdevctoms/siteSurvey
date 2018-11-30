const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
	questions: {type:Array, required:true},
	answers: {type:Array, required:true},
	email: {type:String, required:true,unique:true}
});

surveySchema.methods.serialize = function(){
	return{
		questions:this.questions
	}
};

const SurveyData = mongoose.model("SurveyData",surveySchema);

module.exports = {SurveyData};