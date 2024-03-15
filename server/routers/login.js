const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { LOGIN_PATH } = require('./constants')

const Person = require('../models/person');
const User = require('../models/user');
const sessionChecker = require('../middlewares/sessionChecker')


loginRouter.post(`${LOGIN_PATH}`, async (request, response) => {
    try {
        const {username, password} = request.body

        if (!username || !password) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const person = await Person.findOne({username})

        const passordCorrect = person === null ? false : 
            await bcrypt.compare(password, person.passwordHash)

        request.session.user = { username }   

        if(!passordCorrect) {
            response.status(HTTP_CODE.UNAUTHORIZED).json({
                error: "Invalid username or password"
            })
        }  

        const loggedInUser = await User.findById(person.user)
    
        response.status(HTTP_CODE.SUCCESS).json({
            name: loggedInUser.name,
            completedQuizes: loggedInUser.completedQuizes
        })
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

loginRouter.delete(`${LOGIN_PATH}`, sessionChecker, async (request, response) => {
    request.session.destroy()
    response.status(HTTP_CODE.SUCCESS).send({})
})


module.exports = loginRouter
