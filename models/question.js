const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema([{
  id: {
    type: Number,
  },
  question: {
    type: String,
  },
  A: {
    type: String,
  },
  B: {
    type: String,
  },
  C: {
    type: String,
  },
  D: {
    type: String,
  },
  answer: {
    type: String,
  },
  
}]);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;