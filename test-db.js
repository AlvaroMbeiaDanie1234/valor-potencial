const pg = require('pg');
require('dotenv').config({path: '.env.development.local'});
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
pool.query('SELECT email FROM "user" WHERE email = $1', ['telegramtesteamdm@gmail.com'])
  .then(res => { console.log("User exists:", res.rows.length > 0); process.exit(); })
  .catch(err => { console.error(err); process.exit(1); });
