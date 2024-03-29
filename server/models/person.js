const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    username: String,
    passwordHash: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person