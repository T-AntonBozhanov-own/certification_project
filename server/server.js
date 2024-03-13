const dotenv = require("dotenv").config()
const express = require('express')  // We import the express application
const cors = require('cors')
const morgan = require('morgan')

const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())

app.use(morgan('dev'))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
  })

module.exports = server  