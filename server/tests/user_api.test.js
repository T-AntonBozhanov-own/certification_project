require('dotenv').config();
const supertest = require('supertest')
const {closeConnection} = require('../config/mongodb')
const helper = require('./test_helper')
const server = require('../server')
const { USER_PATH, PERSON_PATH, LOGIN_PATH } = require('../routers/constants')

const api = supertest(server)

// beforeAll(async () => {
//   const newUser = {
//     name: 'user',
//     password: '12345'
//   }
//   await api.post(PERSON_PATH)
//     .send(newUser)
//     .set('Accept', 'application/json')

//   await api.post(LOGIN_PATH)
//     .send(newUser)
//     .set('Accept', 'application/json')
// })

beforeEach(async () => {
  // Clear data and load new entries for tests
  
  await helper.clearData()
})

afterAll(async () => {
  // Closes connection after all tests run
  await closeConnection()
  await server.close()
})

describe('GET test', () => {

  test('we have 2 currencies at the start', async () => {
    const user = {
      username: 'user',
      password: '12345'
    }
  
    await api.post(LOGIN_PATH).send(user).expect(200)
    const response = await api.get(USER_PATH).expect(200)
  })
})

