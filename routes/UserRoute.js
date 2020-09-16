const express = require('express');
const app = express();

const UserModel = require('../models/user');
const QuestionModel = require('../models/question');

const { generateRandomNumbers } = require("../utils/generateRandomNumbers");

app.post('/user/create', (req, res) => {
    const {userId, userGrade} = req.body;
    const {numOfQuestionsAnswered, numOfCorrectQuestions} = userGrade;
    if (userId && numOfQuestionsAnswered && numOfCorrectQuestions) {
        UserModel.create(req.body, (err, result) => {
            if (err) throw err;
            res.json(result);
        }); 
    }
});

app.post('/users/:userId/submitSolution', (req, res) => {

    //extract id, grade, userId 
    const {userId} = req.params;
    const {questionId, userAnswer} = req.body;
    var questionModel = new QuestionModel

    //use questionId to get user's question
    QuestionModel.find({}, 'questionsArray', (err, result) => {
        let questionsArray = result[0]._doc.questionsArray;
        let randomQuestions = getRandomQuestions(questionsArray)
        let userQuestion =  randomQuestions.filter((question) => {
            return question.id === questionId;
        })[0];

      //find current user and make update of numOfQuestionsAnswered and 
      //numOfCorrectQuestions fields accordingly
      UserModel.findOne({'userId': userId}, (err, result) => {
            let currentNumOfQuestionsAnswered = result.userGrade.numOfQuestionsAnswered + 1
            let currentNumOfCorrectQuestions = userQuestion.answer === userAnswer ? 
                    result.userGrade.numOfCorrectQuestions + 1 :
                    result.userGrade.numOfCorrectQuestions;
            
            let filter = {'userId': userId};
            let update = {
                'userGrade.numOfQuestionsAnswered': currentNumOfQuestionsAnswered,
                'userGrade.numOfCorrectQuestions' : currentNumOfCorrectQuestions
            }
            //update user fields and respond with user's score in percentage
            UserModel.findOneAndUpdate(filter, update, (err, result) => {
                if (err) throw err;
                let userGradeInPercentage = calculateUserPercentage(currentNumOfCorrectQuestions);
                res.send('Your score is ' + userGradeInPercentage + '%');
            });
        });
    });	
})

function getRandomQuestions(questionArray) {
    let randomNumsSet = generateRandomNumbers();
    var questions = new Array();
    for (const randomNum of randomNumsSet) {
        questions.push(questionArray[randomNum]);
    }
    return questions;
}

function calculateUserPercentage(currentNumOfCorrectQuestions) {
    return (currentNumOfCorrectQuestions/40) * 100;
}

module.exports = app;
