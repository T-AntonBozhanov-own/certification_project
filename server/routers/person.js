const bcrypt = require('bcryptjs')
const personRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { PERSON_PATH } = require('./constants')

const Person = require('../models/person')
const User = require('../models/user')

/**
 * @receives a get request to the URL: /api/person
 * @responds with the list of available persons'
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
 * @receives a get request to the URL: /api/person/:id
 * @responds with the person entity
 */
personRouter.get(`${PERSON_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)
        const person = await Person.findById(id);

        if (!person) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.json(person)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * @receives a post request to the URL: /api/person
 * @responds with the person entity
 */
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

/**
 * @receives a post request to the URL: /api/person/:newName
 * @responds with the person entity
 */
personRouter.put(`${PERSON_PATH}`, async (request, response) => {
    try {
        const newName = request.params.newName

        const duplicateCount = await Person.countDocuments({username: newName}).exec()
        if(duplicateCount !== 0) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'User with this username already exist'})
        }

        const updatedUser = await Person.findOneAndUpdate({name: request.session.user}, {
            name: newName
        }, 
        {new: true})
        
        await updatedUser.save()

        response.status(HTTP_CODE.CREATED).send(updatedUser)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})


/**
 * @receives a delete request to the URL: /api/person/:name
 * @responds with the http code
 */
personRouter.delete(`${PERSON_PATH}/:id`, async (request, response) => {
    try {
        const name = request.params.name

        //Get person to delete
        const personToDelete = await Person.findOne({name})

        //delete person from db
        await Person.deleteOne({name})
        await User.deleteByID(personToDelete._id)
        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

module.exports = personRouter
