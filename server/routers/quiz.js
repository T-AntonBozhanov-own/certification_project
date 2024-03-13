const quizRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { QUIZ_PATH } = require('./constants')
const Quiz = require('../models/quiz')

/**
 * @receives a get request to the URL: http://localhost:3001/api/quiz
 * @responds with the string list of available quizes'
 */
quizRouter.get(QUIZ_PATH, async (request, response) => {
    try{
        // Get all quizes
        const quizes = await Quiz.find({});
        response.json(quizes)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/quiz/:id
 * @responds with returning specific data as a JSON
 */
quizRouter.get(`${QUIZ_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)
        const quiz = await Quiz.findById(id);

        if (!currency) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.json(quiz)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

module.exports = quizRouter
