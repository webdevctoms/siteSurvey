const express = require("express");
//include tool checks
const {SurveyData} = require('../models/surveyData');
const {CheckSurvey} = require('../tools/checkSurvey');
const {CheckChars} = require('../tools/checkChars');
const rateLimit = require("express-rate-limit");

const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message:"To many attempts"
});

router.use(apiLimiter);

router.post('/',CheckChars,CheckSurvey, (req,res) => {
	return res.status(201).json({
		message:"Success"
	});
});

module.exports = {router};