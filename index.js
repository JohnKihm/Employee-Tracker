const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: '127.0.0.1',
      database: process.env.DB_NAME
  });
  
  pool.connect();

function init() {
    let cont = true;
    while (cont) {
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
                    break;
                case 'Add Employee':
                    break;
                case 'Update Employee Role':
                    break;
                case 'View All Roles':
                    break;
                case 'Add Role':
                    break;
                case 'View All Departments':
                    break;
                case 'Add Department':
                    break;
                case 'Quit':
                    cont = false;
            }
        });
    }
}

// Function call to initialize app
init();
