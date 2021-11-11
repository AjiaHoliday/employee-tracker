const inquirer = require('inquirer');
const {db, getEmployees, getDepartment, getRoles} = require('./db/index');
require('console.table');

//view all Employees

getEmployees().then((employees) => {
    console.table(employees)
    return;
});

// view all departments
getDepartment().then((departments) => {
    console.table(departments)
    return;
});

// view all roles
getRoles().then((roles) => {
    console.table(roles)
    return;
});