// var MongoClient = require('mongodb').MongoClient;
// const trivia = require('trivia.json')
// var url = "mongodb+srv://admin:Yahoo.com24@cluster0.bbj0i.mongodb.net/trivia?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");

//   var dbo = db.db("trivia");
//   dbo.collection("questions").insertOne(trivia, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });