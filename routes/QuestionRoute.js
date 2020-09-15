const express = require('express');
const trivia = require('../trivia');
const QuestionModel = require('../models/Question');
const app = express();

app.get('/getQuestions', (req, res) => {
	var questionModel = new QuestionModel;
	const questionArray = QuestionModel.find({}, (err, result) => {
		const questionArray = result[0]._doc.questionsArray;
		const questions = getQuestionsInJson(questionArray);
	    res.json({ok: true, questions});
	});
});

function getQuestionsInJson(questionArray) {
	let randomNumsSet = generateRandomNumbers();
	var questions = new Array();
	for (const randomNum of randomNumsSet) {
		questions.push(questionArray[randomNum]);
	}
	return questions;
}

function generateRandomNumbers() {
	let set = new Set()	
	while (set.size < 10) {
		var randNumber = Math.floor(Math.random() * 10);
		set.add(randNumber);
	}
	return set;
}

app.post('/getQuestions', (req, res) => {
	var questionModel = new QuestionModel;
	initialiseQuestions(questionModel);	
	questionModel.save((err, result) => {
		if (err) throw err;
		res.json(result);
	});
  });

function initialiseQuestions(questionModel) {
	for (let i = 0; i < trivia.length; i++) {
		questionModel.questionsArray.push(trivia[i]);
	}
}

module.exports = app