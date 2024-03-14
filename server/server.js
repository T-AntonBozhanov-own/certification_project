const dotenv = require("dotenv").config()
const express = require('express')  // We import the express application
const cors = require('cors')
const morgan = require('morgan')
const quizRouter = require('./routers/quiz')
const userRouter = require('./routers/user')
const personRouter = require('./routers/person')
const loginRouter = require('./routers/login')
const session = require('express-session')
const {makeConnection} = require('./config/mongodb')


const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000, secure: true }
  }))
  
//Make db connections
makeConnection()
  

app.use('/', quizRouter)
app.use('/', userRouter)
app.use('/', personRouter)
app.use('/', loginRouter)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
  })

module.exports = server  