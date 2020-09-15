const mongoose = require('mongoose');
var trivia = require('trivia');

var QuestionSchema = new mongoose.Schema({
  questionsArray: []
});

var Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;