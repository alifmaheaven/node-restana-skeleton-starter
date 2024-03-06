'use strict';

require('dotenv').config()

const userService = require('restana')();
const nestedRouter = userService.newRouter()

// config

// controllers
const usersController = require('../controllers/usersController')

// routes
nestedRouter.get('/', usersController.getData)
nestedRouter.post('/login', usersController.login)

module.exports = nestedRouter;