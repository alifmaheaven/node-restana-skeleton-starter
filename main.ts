require('dotenv').config();

const https = require('https');
const restana = require('restana');

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const {
  SwaggerValidationError,
  SwaggerValidator
} = require('restana-swagger-validator')

const usersRouter = require('./routes/users');

// variabels
var port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// config
const service = restana({
  // server: https.createServer({
  //   // key: keys.serviceKey,
  //   // cert: keys.certificate
  // })
  errorHandler: (err: any, req: any, res: any) => {
    if (err instanceof SwaggerValidationError) {
      res.statusCode = err.statusCode
      res.send({
        message: err.message,
        errors: err.errors
      })
    } else {
      res.send(err)
    }
  }
});

SwaggerValidator(service, path.join(__dirname, '/spec.json'), {
  buildResponses: false
})

service.use(cors({
  origin: isProduction ? '*' : '*'
}));

// service.use(helmet());
service.use(bodyParser.json({limit: '50mb'}));
service.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// // routes

service.use('/api/v1/users', usersRouter);

// service.get('/api', (req: any, res: any) => res.send('Api already create'));

service.start(port).then(() => {
  console.log(`Server started on port :`+port+``);
}).catch((err: any) => {
  console.error('Error starting server:', err);
});
