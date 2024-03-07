'use strict';

require('dotenv').config()

const userService = require('restana')();
const path = require('path');

const { SwaggerValidator } = require('restana-swagger-validator')

// config
const nestedRouter = userService.newRouter()

// controllers
const usersController = require('../controllers/usersController')

// routes
nestedRouter.get('/', usersController.getData)
nestedRouter.post('/login', usersController.login)

SwaggerValidator(nestedRouter, path.join(__dirname, '/users-sweggers.json'), {
  // buildResponses: true,
  // requireSchemaSpec: true,
  // apiSpecEndpoint: '/api/v1/users/swagger.json',
  // uiEndpoint: '/docs',
  publicApiEndpoint: '/api/v1/users'
})

module.exports = nestedRouter;