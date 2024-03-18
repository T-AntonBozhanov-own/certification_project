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

module.exports = {
  usersInDb,
  clearData
}
