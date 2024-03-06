require('dotenv').config()

const https = require('https')
const restana = require('restana')
const cors = require('cors')

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

service.get('/api', (req: any, res: any) => res.send('Api already create'));

service.start(port).then(() => {
  console.log(`Server started on port :`+port+``);
}).catch((err: any) => {
  console.error('Error starting server:', err);
});
