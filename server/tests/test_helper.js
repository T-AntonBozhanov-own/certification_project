const User = require('../models/user')

// Returns all users from the DB table
const usersInDb = async () => {
  const testUsers = await User.find({})
  return testUsers
}

// Clears all test tables in the database
const clearData = async () => {
  await User.deleteMany()
}

const quizData = [{
    name: 'Js basics',
     questions: [
        {
          question: 'Which of the following is not a primitive data type in JavaScript?',
          options: ['Number', 'String', 'Boolean', 'Object'],
          correct_answer: 3,
          points: 10
       },
       { 
          question: 'What does the “typeof” operator do in JavaScript?',
          options: ['Returns the data type of a variable', 'Checks if a variable is defined', 'Assigns a value to a variable', 'Concatenates two strings'],
          correct_answer: 0,
          points: 10
       },
       { 
          question: 'What is the output of the following code: console.log(2 + “2”)',
          options: ['4', '/"22/"', '4', '22'],
          correct_answer: 1,
          points: 10
       }
    ],
    highest_score: 30
 }]

module.exports = {
  usersInDb,
  clearData,
  quizData
}
