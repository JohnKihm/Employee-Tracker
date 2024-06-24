const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: '127.0.0.1',
        database: process.env.DB_NAME
    }
);
  
pool.connect();


async function getDepartmentID(name) {
    const res = await pool.query(`SELECT id FROM departments WHERE name = $1`, [name])
     return res.rows[0].id;
}

module.exports = { getDepartmentID };
