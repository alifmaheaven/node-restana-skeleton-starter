require('dotenv').config()

const https = require('https')
const restana = require('restana')
const bodyParser = require('body-parser')
const cors = require('cors')

const usersRouter = require('./routes/users')

// variabels
var port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production'

// config
const service = restana({
  // server: https.createServer({
  //   // key: keys.serviceKey,
  //   // cert: keys.certificate
  // })
})

service.use(cors({
  origin: isProduction ? '*' : '*'
}))

service.use(bodyParser.json({limit: '50mb'}));
service.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// routes

service.use('/api/v1/users', usersRouter)

service.get('/api', (req: any, res: any) => res.send('Api already create'));

service.start(port).then(() => {
  console.log(`Server started on port :`+port+``);
}).catch((err: any) => {
  console.error('Error starting server:', err);
});
