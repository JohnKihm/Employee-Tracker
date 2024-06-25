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

async function addDepartment(name) {
    const text = `INSERT INTO departments(name) VALUES($1)`;
    const values = [name];
    await pool.query(text, values);
    return;
}

async function addRole(title, salary, departmentID) {
    const text = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    const values = [title, salary, departmentID]
    await pool.query(text, values);
    return;
}

module.exports = { getDepartmentID, addDepartment, addRole };
