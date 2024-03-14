const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    name: String,
    questions: [{
      question: String,
      options: [String],
      correct_answer: Number,
      points: Number
    }],
   highest_score: Number
})

quizSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._is.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz