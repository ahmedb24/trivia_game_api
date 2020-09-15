const mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  questionsArray: []
});

var Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;