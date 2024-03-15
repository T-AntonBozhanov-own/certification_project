const userRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { USER_PATH } = require('./constants')
const User = require('../models/user')
const Quiz = require('../models/quiz')
const sessionChecker = require('../middlewares/sessionChecker')


/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/user/:id
 * @responds with returning specific data as a JSON
 */
userRouter.get(`${USER_PATH}`, sessionChecker, async (request, response) => {
    try {
        const {username} = request?.session?.user
        console.log('username', username)
        const user = await User.findOne({name: username}).exec()
        console.log('user', user)

        if (!user) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.status(HTTP_CODE.SUCCESS).json({
            name: user.name,
            completedQuizes: user.completedQuizes
        })
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/user,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
userRouter.post(USER_PATH, async (request, response) => {
    try {
        const content = request.body

        if (!content.username || !content.password) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        // Make changes in currency db
       // const createdCurrency = await Currency.create({
        //    ...content})
        // response.json(createdCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/user/:userId/:quizId/:answers
 * with data object enclosed
 * @responds by returning the newly updated resource
 */
userRouter.put(`${USER_PATH}/:userId/:quizId/:answers`, async (request, response) => {
    try {
        const userId = Number(request.params.userId)
        const quizId = Number(request.params.questId)
        const answers = Number(request.params.answers)

        const user = await User.findById(userId)
        if(!user) {
            response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'User with this id doesnt exist' })
        }

        const quiz = await Quiz.findById(quizId)
        if(!quiz) {
            response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'Quiz not found' })
        }

        // add result to the user entity 
        user.completedQuizes = [
            ...user.completedQuizes,
            {
                quizId: quiz.id,
                quizScore: 10
            }
        ]

        await user.save()

        response.json(modifiedCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

module.exports = userRouter
