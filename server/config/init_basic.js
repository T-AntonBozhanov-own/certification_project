const {makeConnection, closeConnection} = require('./mongodb')
const Quiz = require('../models/quiz')
const quizData = require('./quizData')


makeConnection().then(() => Quiz.insertMany(quizData).then(() => {
    console.log('quiz insert successfull')
    closeConnection()
}).catch(error => {
    console.log('Error while performing quiz insertion', e)
    closeConnection()
}))