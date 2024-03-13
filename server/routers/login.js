const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { LOGIN_PATH } = require('./constants')

const Person = require('../models/person')


loginRouter.post(`${LOGIN_PATH}`, async (request, response) => {
    try {
        const {username, password} = request.body

        if (!username || !password) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const person = Person.findOne({username})

        const passordCorrect = person === null ? false : 
            await bcrypt.compare(password, person.passwordHash)

        if(!passordCorrect) {
            response.status(HTTP_CODE.UNAUTHORIZED).json({
                error: 'Invalid username or password'
            })
        }  

        
        response.status(HTTP_CODE.SUCCESS).send(person)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

module.exports = personRouter
