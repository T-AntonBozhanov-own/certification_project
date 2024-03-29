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
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User