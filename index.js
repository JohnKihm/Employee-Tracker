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
  
// pool.connect();

function init() {
    inquirer.prompt([
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
    ]).then((data) => {
        switch (data.action) {
            case 'View All Employees':
            case 'View All Roles':
            case 'View All Departments':
                const table = data.action.split(' ')[2].toLowerCase();
                pool.query(`SELECT * FROM ${table}`, (err, {rows}) => {
                    console.log(rows);
                });
                break;
            case 'Add Employee':
                break;
            case 'Update Employee Role':
                break;
            case 'Add Role':
                break;
            case 'Add Department':
                break;
            case 'Quit':
                return;
        }
        init();
    });
}

// Function call to initialize app
init();
