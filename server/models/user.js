const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    completedQuizes: [{
      quizName: String,
      quizScore: Number
    }],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._is.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

const User = mongoose.model('Quiz', userSchema)

module.exports = User