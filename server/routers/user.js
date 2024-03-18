const userRouter = require('express').Router()
const {HTTP_CODE} = require("../constants/httpCodes");
const { USER_PATH } = require('./constants')
const User = require('../models/user')
const Person = require('../models/person')
const Quiz = require('../models/quiz')
const sessionChecker = require('../middlewares/sessionChecker')

/**
 * @receives a get request to the URL: api/user
 * @responds with returning user entity
 */
userRouter.get(`${USER_PATH}`, sessionChecker, async (request, response) => {
    try {
        const {username} = request?.session?.user
        const user = await User.findOne({name: username}).exec()

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
 * @receives a post request to the URL: /api/user/result
 * with data object enclosed
 * @responds by returning the newly updated resource
 */
userRouter.post(`${USER_PATH}/result`, async (request, response) => {
    try {
        const { name, answers} = request.body

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

/**
 * @receives a post request to the URL: api/user,
 * @responds by returning the newly created resource
 */
userRouter.post(USER_PATH, async (request, response) => {
    try {
        const {name} = request.body

        if (!content.name) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const user = new User({
            name,
            completedQuizes: [],
        })

        await user.save()

        response.status(HTTP_CODE.SUCCESS).json({
            name: user.name,
            completedQuizes: user.completedQuizes
        })
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})


userRouter.delete(`${USER_PATH}/:name`, async (request, response) => {
    try {
        const name = request.params.name

        //Get person to delete
        const userToDelete = await User.findOne({name})


        //Find all persons which reffered with deleted user
        const persons = await Person.filter(person => person.user._id === userToDelete._id )

        await Promise.all(persons.map(person => Person.deleteById(person.id)))

        //delete user from db
        await User.deleteOne({name})
        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})



module.exports = userRouter
