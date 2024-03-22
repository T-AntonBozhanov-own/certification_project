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
                questions: item.questions.map(item => ({
                    question: item.question,
                    options: item.options,
                    correct_answer: item.correct_answer,
                    points: item.points
                })),
                highest_score: item.highest_score
            }))
        response.json(responce)
    } catch (e) {
        console.log(e)
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * @receives a get request to the URL: /quiz/:id
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
 * @receives a post request to the URL: /quiz/add
 * @responds with returning specific data as a JSON with created quiz
 */
quizRouter.post(`${QUIZ_PATH}/add`, sessionChecker, async (request, response) => {
    try {
        const {name, questions} = request.body

        if (!name || !questions) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const duplicateCount = await Quiz.countDocuments({name}).exec()
        if(duplicateCount !== 0) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'Quiz with this name already exist'})
        }

        const quiz = new Quiz({
            name,
            questions: questions.map(item => ({
                question: item.question,
                correct_answer: Number(item.correct_answer),
                points: Number(item.points),
                options: item.options.split(',')
                })),
            highest_score: questions.reduce((acc, item) => acc + Number(item.points), 0)
        })

        await quiz.save()

        response.status(HTTP_CODE.SUCCESS).send(quiz)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({})
    }
})

quizRouter.put(`${QUIZ_PATH}/edit`, sessionChecker, async (request, response) => {
    try {
        const {name, questions} = request.body

        if (!name || !questions) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        console.log(name, questions)

        const updatedQuiz = await Quiz.findOneAndUpdate({name}, {
            questions: questions.map(item => ({
                question: item.question,
                correct_answer: Number(item.correct_answer),
                points: Number(item.points),
                options: item.options.split(',')
                })),
            highest_score: questions.reduce((acc, item) => acc + Number(item.points), 0)
        }, 
        {new: true})
        
        await updatedQuiz.save()

        response.status(HTTP_CODE.SUCCESS).send(updatedQuiz)
    } catch (e) {
        console.log(e)
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({})
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
