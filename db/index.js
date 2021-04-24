require('dotenv').config()

const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
  // connectionString: 'postgres://postgres:root@localhost:5432/loyalty_db'
})
client.connect()
module.exports = client
