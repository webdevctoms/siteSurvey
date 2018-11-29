const express = require("express");
//include tool checks
const {SurveyData} = require('../models/surveyData');
const {CheckSurvey} = require('../tools/checkSurvey');
const {CheckChars} = require('../tools/checkChars');
const router = express.Router();

router.post('/',CheckChars,CheckSurvey, (req,res) => {
	return res.status(201).json({
		message:"Success"
	});
});

module.exports = {router};