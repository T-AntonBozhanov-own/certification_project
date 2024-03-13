const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._is.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person