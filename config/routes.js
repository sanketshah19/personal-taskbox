const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')
const labelsController = require('../app/controllers/labelsController')
const authenticateUser = require('../app/middlewares/authentication')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.delete('/users/logout', authenticateUser, userController.logout)

router.get('/labels', authenticateUser, labelsController.list)
router.post('/labels', authenticateUser, labelsController.create)

module.exports = router