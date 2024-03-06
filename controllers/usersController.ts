'use strict';

require('dotenv').config()

const { v4: uuidv4 } = require('uuid');

const response = require('../config/response');
var { pool } = require('../config/database');

var SCREET_KEY = process.env.SCREET_KEY;
var EXPIRED_TOKEN = process.env.EXPIRED_TOKEN ? parseInt(process.env.EXPIRED_TOKEN) : 0;

// agar sepuluh baris maka kita gunakan salt dan pake async ya :)
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.login = async (req: any, res: any) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  pool.query(query, values, (err: any, result: any) => {
    if (err) {
      response.bad('Error', err, res);
    } else {
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
          if (err) {
            response.bad('Error', err, res);
          } else {
            if (isMatch) {
              const token = jwt.sign({ id: user.id }, SCREET_KEY, { expiresIn: EXPIRED_TOKEN });
              response.ok('Login success', { token: token }, res);
            } else {
              response.bad('Password wrong', {}, res);
            }
          }
        });
      } else {
        response.bad('Username not found', {}, res);
      }
    }
  });
}

exports.getData = async (req: any, res: any) => {
  response.ok('Data already to you', {id: uuidv4()}, res);
}
