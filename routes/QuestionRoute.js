const express = require('express');
const trivia = require('trivia');
const QuestionModel = require('../models/Question');
const app = express();

app.get('/getQuestions', (req, res) => {
    const questionArray = QuestionModel.find({});
	const questions = getQuestionsInJson(questionArray);
	res.json({ok: true, questions});
	console.log(questions);
});

app.post('/getQuestions', (req, res) => {
	QuestionModel.create(trivia);
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

module.exports = app