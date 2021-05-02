const pg = require('pg');
const Client = pg.client;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 3000
};

const client = new Client(config);

pool.connect(() => {
  console.log('connected to database');
});

module.exports = client;
