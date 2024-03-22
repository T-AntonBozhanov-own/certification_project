require('dotenv').config();
const {closeConnection} = require('../config/mongodb')
const server = require('../server')
const { USER_PATH } = require('../routers/constants')
const session = require('supertest-session');

var testSession = null;
    
beforeEach(function () {
    testSession = session(server);
});

afterAll(async () => {
    // Closes connection after all tests run
    await closeConnection()
    await server.close()
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
  
  test('get user by name', async () => {
    const res = await authenticatedSession.get(USER_PATH).expect(200);
    expect(res.body).toEqual({
          completedQuizes: [
             {
               _id: "65fddfd3954edea561a40c3f",
               quizId: "65f7e425de64f32c6daa42ff",
               quizScore: 30,
             },
           ],
           name: "user",
    });
    })
})

