const quizRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { QUIZ_PATH } = require('./constants')
const Quiz = require('../models/quiz')
const User = require('../models/user')

const sessionChecker = require('../middlewares/sessionChecker')

/**
 * @receives a get request to the URL: /api/quiz
 * @responds with the string list of available quizes'
 */
quizRouter.get(QUIZ_PATH, sessionChecker, async (request, response) => {
    try{
        // Get all quizes
        const quizes = await Quiz.find({});
        const responce = quizes.map(item => ({
                name: item.name,
                questions: item.questions,
                highest_score: item.highest_score
            }))
        response.json(responce)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * @receives a get request to the URL: /quiz/:name
 * @responds with returning specific data as a JSON
 */
quizRouter.get(`${QUIZ_PATH}/:id`, async (request, response) => {
    try {
        const id = request.params.id
        const quiz = await Quiz.findById(id)

        if (!quiz) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }

        const responce = {
            name: quiz.name,
            questions: quiz.questions,
            highest_score: quiz.highest_score
        }
        response.json(responce)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found', e })
    }
})

/**
 * @receives a post request to the URL: /quiz
 * @responds with returning specific data as a JSON with created quiz
 */
quizRouter.post(`${QUIZ_PATH}`, async (request, response) => {
    try {
        const {name, questions, highest_score} = request.body

        if (!name || !questions || !highest_score) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const quiz = new Quiz({
            name,
            questions,
            highest_score
        })

        await quiz.save()

        response.status(HTTP_CODE.SUCCESS).send(quiz)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: e })
    }
})

/**
 * @receives a delete request to the URL: /api/quiz/:name
 * @responds with the http code
 */
quizRouter.delete(`${QUIZ_PATH}/:name`, async (request, response) => {
    try {
        const name = request.params.name

        const quizToDelete = await Quiz.findOne({name})

        //Find all users which completed quiz to delete
        const usersWithCompletedQuiz = await User.filter(user => user.completedQuizes.quizId === quizToDelete._id )

        // Remove this quiz id from this users
        await Promise.all(usersWithCompletedQuiz.forEach(user => user.completedQuizes.filter(quizId => quizId !== quizToDelete._id )))

        await Quiz.deleteOne({name})
        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})


module.exports = quizRouter
