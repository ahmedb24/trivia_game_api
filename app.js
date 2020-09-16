const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const questionRouter = require('./routes/QuestionRoute.js');
const userRouter = require('./routes/UserRoute');

const app = express();
const port = process.env.PORT || 4041;

mongoose.connect('mongodb+srv://admin:com123123@cluster0.bbj0i.mongodb.net/trivia?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(questionRouter);
app.use(userRouter);

const users = [{name: 'John', email:'John@gmail'}];











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

