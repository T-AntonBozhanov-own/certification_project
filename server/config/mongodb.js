const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')})
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const makeConnection = async () => {
    const dbUrl = process.env.MONGO_URL
    
    try {
        console.log(`Connecting to .... ${dbUrl}`)
        await mongoose.connect(dbUrl)
        console.log('Successfully connected to DB')
    } catch(e) {
        console.log('Error while connecting to DB', e)
    }
}

const closeConnection = async () => {
    try {
        await mongoose.connection.close()
    } catch (e) {
        console.log('Error while closing connection', e)
    }
}

module.exports = { makeConnection, closeConnection }