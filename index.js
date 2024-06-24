const inquirer = require('inquirer');
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

async function init() {
    let action = await inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    );
    action = action.action;
switch (action) {
    case 'View All Employees':
    case 'View All Roles':
    case 'View All Departments':
        const table = action.split(' ')[2].toLowerCase();
        // const query = {
        //     text: `SELECT * FROM ${table}`,
        //     rowMode: 'array'
        // }
        const res = await pool.query(`SELECT * FROM ${table}`);
        console.log(res.rows);
        break;
    case 'Add Employee':
        break;
    case 'Update Employee Role':
        break;
    case 'Add Role':{
        const data = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'Which department does the role belong to?',
                name: 'department'
            }
        ]);
        const { roleName, salary, department } = data;
        const sql = `INSERT INTO roles () VALUES ($1)`;
        await pool.query(sql, [], (err, { rows }) => {
            if (err) console.error(err);
        });
        console.log(`Added ${roleName} to the database`);
    }
        break;
    case 'Add Department':{
        const data = await inquirer.prompt(
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentName'
            }
        );
        const { departmentName } = data;
        const sql = `INSERT INTO departments (name) VALUES ($1)`;
        await pool.query(sql, [departmentName], (err, { rows }) => {
            if (err) console.error(err);
        });
        console.log(`Added ${departmentName} to the database`);
    }
        break;
    case 'Quit':
        process.exit(1);
}
init();
}

// Function call to initialize app
init();
