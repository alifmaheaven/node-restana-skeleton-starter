require('dotenv').config()

var database = require('pg')
var types = database.types
types.setTypeParser(1114, function(stringValue: any) {
    return stringValue;
});

const { Pool } = database

const isProduction = process.env.NODE_ENV === 'production'
const typeConnection = process.env.DB_TYPE_CONNECT 

let pool: any = null;

const env = isProduction ? 'PRODUCTION' : '';
const getEnv = (key: string) => process.env[`${key}_${env}`] || process.env[key] || '';

const connectionString = `postgresql://${getEnv('DB_USER')}:${getEnv('DB_PASSWORD')}@${getEnv('DB_HOST')}:${getEnv('DB_PORT')}/${getEnv('DB_DATABASE')}`;

if (typeConnection == 'url') {
  pool = new Pool({
    connectionString,
    ssl: getEnv('DB_SSL') == 'true',
    connectionTimeoutMillis : 15000,
    idleTimeoutMillis : 30000
  })
} else if (typeConnection == 'connector'){
  pool = new Pool({
    user: getEnv('DB_USER'),
    host: getEnv('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    password: getEnv('DB_PASSWORD'),
    port: getEnv('DB_PORT'),
    ssl: getEnv('DB_SSL') == 'true',
    connectionTimeoutMillis : 15000,
    idleTimeoutMillis : 30000
  })
}

// const pool = new Pool(arrayObjectConnection)

pool.connect( function(err:any){
    if (err) throw err;
})

module.exports = { pool }
