const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')
const labelsController = require('../app/controllers/labelsController')
const tasksController = require('../app/controllers/tasksController')
const authenticateUser = require('../app/middlewares/authentication')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.delete('/users/logout', authenticateUser, userController.logout)

router.get('/labels', authenticateUser, labelsController.list)
router.post('/labels', authenticateUser, labelsController.create)
router.get('/labels/:id', authenticateUser, labelsController.show)
router.put('/labels/:id', authenticateUser, labelsController.update)
router.delete('/labels/:id', authenticateUser, labelsController.destroy)

router.get('/tasks', authenticateUser, tasksController.list)
router.post('/tasks', authenticateUser, tasksController.create)
router.get('/tasks/:id', authenticateUser, tasksController.show)

module.exports = router