const express = require("express");
//include tool checks
const {SurveyData} = require('../models/surveyData');
const {CheckSurvey} = require('../tools/checkSurvey');
const {CheckChars} = require('../tools/checkChars');
const rateLimit = require("express-rate-limit");

const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 5,
  message:"To many attempts"
});

router.use(apiLimiter);

router.post('/',CheckChars,CheckSurvey, (req,res) => {
	//console.log("test");
	const {questions,answers,email} = req.body;

	return SurveyData.create({
		questions,
		answers,
		email
	})
	.then(data => {
		return res.status(201).json(data.serialize());
	})
	.catch(err => {
		if(err.reason === 'ValidationError'){
			return res.status(err.code).json(err);
		}
		if(err.code === 11000){

			return res.status(422).json({
				code:422,
				reason:"ValidationError",
				message:"email taken"
			});

		}
		res.status(500).json({code:500, message:'internal server error'});
	});
	
});

module.exports = {router};