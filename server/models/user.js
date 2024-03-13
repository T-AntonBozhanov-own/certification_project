const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    completedQuizes: [{
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
      },
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