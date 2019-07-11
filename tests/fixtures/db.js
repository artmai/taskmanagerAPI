const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Boddy',
  email: 'bobby@gmail.com',
  password: '56What!',
  tokens: [{
    token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Alex',
  email: 'alex@gmail.com',
  password: 'MyHouse099!',
  tokens: [{
    token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'this is an automated task from the db',
  completed: false,
  owner: userOneId
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'this is my second automated task from the db',
  completed: true,
  owner: userOneId
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'this is my third automated task from the db',
  completed: true,
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
}
