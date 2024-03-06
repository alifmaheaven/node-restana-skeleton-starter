'use strict';

require('dotenv').config()


const { v4: uuidv4 } = require('uuid');

const response = require('../config/response');

exports.getData = async (req: any, res: any) => {
  response.ok('Data already to you', {id: uuidv4()}, res);
}
