require('dotenv').config();
const {closeConnection} = require('../config/mongodb')
const server = require('../server')
const { QUIZ_PATH } = require('../routers/constants')
const session = require('supertest-session');
const {quizData} = require('./test_helper')

var testSession = null;
    
beforeEach(function () {
    testSession = session(server);
});

 afterAll(async () => {
    // Closes connection after all tests run
    await closeConnection()
    server.close()
  })

describe('GET test', () => {
  let authenticatedSession;

  beforeEach(function (done) {
    testSession.post('/api/login')
      .send({ username: 'user', password: '12345' })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  test('get quiz list', async () => {
    const res = await authenticatedSession.get(QUIZ_PATH).expect(200);
    expect(res.body).toEqual(quizData);
    })
  test('get quiz by id', async () => {
      const res = await authenticatedSession.get(`${QUIZ_PATH}/65f7e425de64f32c6daa42ff`).expect(200);
      expect(res.body).toEqual(quizData[0]);
    })  
})

