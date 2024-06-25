const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();
const { getID, addDepartment, addRole, addEmployee } = require('./helpers/queryHandler')

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
        const res = (await pool.query(`SELECT * FROM ${table}`)).rows;
        console.table(res);
        break;
    case 'Add Employee':
        const employeeData = await inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName'
            },
            {
                type: 'input',
                message: "What is the employee's role?",
                name: 'role'
            },
            {
                type: 'input',
                message: "Who is the employee's manager?",
                name: 'manager'
            }
        ]);
        const { firstName, lastName, role, manager } = employeeData;
        const roleID = await getID(role, 'roles', 'title');
        const managerID = await getID(manager, 'employees');
        await addEmployee(firstName, lastName, roleID, managerID);
        console.log(`Added ${firstName + ' ' + lastName} to the database`);
        break;
    case 'Update Employee Role':
        const roles = (await pool.query('SELECT title FROM roles')).rows;
        for (let i = 0; i < roles.length; i++) {
            roles[i] = roles[i].title;
        }
        const updateData = await inquirer.prompt([
            {
                type: 'input',
                message: "Which employee's role do you want to update?",
                name: 'employeeName'
            },
            {
                type: 'list',
                message: 'Which role do you want to assign to the selected employee?',
                choices: roles,
                name: 'newRole'
            }
        ]);
        const { employeeName, newRole } = updateData;
        const employeeID = await getID(employeeName, 'employees');
        const newRoleID = await getID(newRole, 'roles', 'title');
        await pool.query(`UPDATE employees SET role_id = ${newRoleID} WHERE id = ${employeeID}`);
        console.log("Updated employee's role");
        break;
    case 'Add Role':
        const roleData = await inquirer.prompt([
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
        const { roleName, salary, department } = roleData;
        const departmentID = await getID(department, 'departments', 'name');
        await addRole(roleName, salary, departmentID);
        console.log(`Added ${roleName} to the database`);
        break;
    case 'Add Department':
        const departmentData = await inquirer.prompt(
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentName'
            }
        );
        const departmentName = departmentData.departmentName;
        await addDepartment(departmentName);
        console.log(`Added ${departmentName} to the database`);
        break;
    case 'Quit':
        process.exit(1);
}
init();
}

// Function call to initialize app
init();
