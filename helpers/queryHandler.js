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


async function getID(value, table, field) {
    let text;
    if (table === 'employees') {
        text = `SELECT id FROM ${table} WHERE first_name = $1 AND last_name = $2`;
        values = value.split(' ');
    } else {
        text = `SELECT id FROM ${table} WHERE ${field} = $1`;
        values = [value];
    }
    const res = await pool.query(text, values);
    return res.rows[0].id;
}

async function addDepartment(name) {
    const text = `INSERT INTO departments(name) VALUES($1)`;
    const values = [name];
    await pool.query(text, values);
    return;
}

async function addRole(title, salary, departmentID) {
    const text = `INSERT INTO roles(title, salary, department_id) VALUES($1, $2, $3)`;
    const values = [title, salary, departmentID]
    await pool.query(text, values);
    return;
}

async function addEmployee(firstName, lastName, roleID, managerID) {
    const text = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)`;
    const values = [firstName, lastName, roleID, managerID];
    await pool.query(text, values);
    return;
}

module.exports = { getID, addDepartment, addRole, addEmployee };
