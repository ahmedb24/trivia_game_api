
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const questionRouter = require('./routes/QuestionRoute.js');

const app = express();
const port = process.env.PORT || 4042;

mongoose.connect('mongodb+srv://admin:com123123@cluster0.bbj0i.mongodb.net/trivia?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(questionRouter);

const users = [{name: 'John', email:'John@gmail'}];

app.get('/getQuestions', (req, res) => {
	const questions = getQuestionsInJson();
	res.json({ok: true, questions});
	console.log(trivia);
});

var user = {
	userGrade: {
		numOfQuestionsAnswered: 0,
		numOfCorrectQuestions: 0
	}
}

app.post('/submitSolution', (req, res) => {
	userGrade.numOfQuestionsAnswered++
	
	//extract id, grade and get first 10 random questions
	const {id, grade} = req.body;
	let questions =  getQuestionsInJson()
	console.log(questions);

	//find question matching the question user answered
	var question = questions.filter((currentQuestion) => {
		return currentQuestion.id === id; 
	})[0];

	//handle grading
	if(question.answer === grade) {
		console.log('pass');
		userGrade.numOfCorrectQuestions++
	}
	console.log(userGrade);
	res.end();
	//res.send({userGrade.numOfQuestionsAnswered, userGrade.numOfCorrectQuestions});
});









app.get('/', (_, res) => {
	res.send('My express');
});

app.get('/users', (_, res) => {
	res.json({ ok: true, users});
});

app.get('/users/:name', (req, res) => {
	const {name} = req.params;
	const user = users.filter((user) => user.name === name);
	res.json({user});
});

app.post('/addUser', (req, res) => {
	const {name, email} = req.body;
	if (name && email) {
		users.push({name, email});
		res.json({ok: true, users});
	}
});

app.listen(port, () => {
	console.log(`running server on ${port}`);
});

