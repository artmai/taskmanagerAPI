const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body, //copy all properties of the object to the task
    owner: req.user.id
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch(e) {
    res.status(400).send(e)
  }
})

// GET /tasks?completed=true (or false)
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_desc (or _asc)
router.get('/tasks', auth, async (req,res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id })
    // res.status(200).send(tasks)
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.status(200).send(req.user.tasks)
  } catch(e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, owner: req.user._id})
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValideOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValideOperation) {
    return res.status(400).send({error: "Invalid fields"})
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
    if (!task) {
      return res.status(404).send({error: "could not find task"})
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
