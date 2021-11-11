const inquirer = require('inquirer');
const { menu, newRole, newDept, newEmployeeQ } = require('./lib/questions');
const {db, getEmployees, getDepartment, getRoles} = require('./db/index');
require('console.table');

function mainMenu() {
    console.log(`
    ++__++__++__++__++__++
    ~EMPLOYEE~TRACKER~
    ++__++__++__++__++__++`)
    return inquirer
    .prompt(menu).then((answer) => {
        console.clear()
        switch(answer.menu) {  
            case "View All Employees":
               //view all Employees
                getEmployees().then((employees) => {
                    console.table(employees)
                    return mainMenu();
                }); 
                break;
            case "View All Departments":
                // view all departments
                getDepartment().then((departments) => {
                    console.table(departments)
                    return mainMenu();
                });
                break;
            case "View All Roles":
                // view all roles
                getRoles().then((roles) => {
                    console.table(roles)
                    return mainMenu();
                });
                break;
        };
    });
};

mainMenu();