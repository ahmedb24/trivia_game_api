const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: Number,
    userGrade: {
        numOfQuestionsAnswered: Number,
        numOfCorrectQuestions: Number
    }       
});

var Users = mongoose.model("User", UserSchema);
module.exports = Users;