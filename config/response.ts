'use strict';

exports.created = function(message:string = 'Success', values: object = {}, res: any) {
  res.send(
    {
      status: 201,
      message: message,
      data: values,
    }, 
    201, 
  )
};

exports.ok = function(message:string = 'Success', values: object = {}, res: any) {
  res.send(
    {
      status: 200,
      message: message,
      data: values,
    }, 
    200, 
  )
};

exports.bad = function(message:string = 'Success', values: object = {}, res: any) {
  res.send(
    {
      status: 400,
      message: message,
      data: values,
    }, 
    400, 
  )
};

exports.validation = function(message:string = 'Success', values: object = {}, res: any) {
  res.send(
    {
      status: 422,
      message: message,
      data: values,
    }, 
    422, 
  )
}

exports.notfound = function(message:string = 'Success', values: object = {}, res: any) {
  res.send(
    {
      status: 404,
      message: message,
      data: values,
    }, 
    404, 
  )
};

exports.unauthorized = function(message:string, values: object, res: any) {
  res.send(
    {
      status: 401,
      message: message,
      data: values,
    }, 
    401, 
  )
};