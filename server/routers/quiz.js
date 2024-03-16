const quizRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { QUIZ_PATH } = require('./constants')
const Quiz = require('../models/quiz')
const User = require('../models/user')

const sessionChecker = require('../middlewares/sessionChecker')

/**
 * @receives a get request to the URL: http://localhost:3001/api/quiz
 * @responds with the string list of available quizes'
 */
quizRouter.get(QUIZ_PATH, sessionChecker, async (request, response) => {
    try{
        // Get all quizes
        console.log('request', request.session)
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

quizRouter.post(`${QUIZ_PATH}`, sessionChecker, async (request, response) => {
    try {
        const {name, answers} = request.body

        if (!name || !answers) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const quiz = await Quiz.findOne({name})

        const result = quiz.questions.reduce((acc, item, index) => {
            if(item.correct_answer === answers[index]) {
                acc = acc + item.points
            }
            return acc
        }, 0)
        
        const {username} = request?.session?.user
        const user = await User.findOne({name: username})

        console.log("user", user)
        const updatedUser = await User.findOneAndUpdate({name: user.name}, {
            completedQuizes: {
                quizId: quiz._id,
                quizScore: result
            }
        }, 
        {new: true})
        
        await updatedUser.save()


        response.status(HTTP_CODE.SUCCESS).send({result})
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: e })
    }
})


module.exports = quizRouter
