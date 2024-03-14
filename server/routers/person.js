const bcrypt = require('bcryptjs')
const personRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { PERSON_PATH } = require('./constants')

const Person = require('../models/person')
const User = require('../models/user')

/**
 * @receives a get request to the URL: http://localhost:3001/api/quiz
 * @responds with the string list of available quizes'
 */
personRouter.get(PERSON_PATH, async (request, response) => {
    try{
        // Get all persons
        const persones = await Person.find({});
        response.json(persones)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/quiz/:id
 * @responds with returning specific data as a JSON
 */
personRouter.get(`${PERSON_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)
        const person = await Person.findById(id);

        if (!currency) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.json(person)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

personRouter.post(`${PERSON_PATH}`, async (request, response) => {
    try {
        const content = request.body

        if (!content.username || !content.password) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const duplicateCount = await Person.countDocuments({username: content.username}).exec()
        if(duplicateCount !== 0) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'User with this username already exist'})
        }

        const passwordHash = await bcrypt.hash(content.password, 10)

        const user = new User({
            name: content.username,
            completedQuizes: [],
        })

        await user.save()

        const person = new Person({
            username: content.username,
            passwordHash,
            user
        })

        const personResponse = await person.save()
        response.status(HTTP_CODE.CREATED).send({})
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

personRouter.delete(`${PERSON_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)

        //Get user to delete
        const userToDelete = Person.findById(id)?.user
        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

module.exports = personRouter
