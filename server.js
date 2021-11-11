const inquirer = require('inquirer');
const { menu, newRoles, newDept, newEmployeeQuestions, removeEmployeePrompt } = require('./lib/questions');
const {db, getEmployees, getDepartment, getRoles, addRole, addDepartment, addEmployee, updateEmployee, deleteEmployee} = require('./db/index');
const { table } = require('console');
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
            case "Add Department":
                return newDepartment();
            case "Add Role":
                return newRole();
            case "Add Employee":
                return newEmployee();
            case "Update Employee Role":
                return updateRole();
            case "Delete an employee":
                return remove();
            case "EXIT":
                return process.exit();
        };
    });
};

function newDepartment() {
    inquirer
    .prompt(newDept)
    .then((answers)=>{
        const {name} = answers;
        addDepartment(name).then((results) =>{
            return mainMenu();
        });
    });
};

function newRole() {
    let roleQuestions = newRoles;
    getDepartment()
    .then((departments) => {
        roleQuestions.push(selectDepartmentQuestion(departments));
        return inquirer.prompt(roleQuestions)
    })
    .then((answers) => {
        const { title, salary, department_id} = answers;
        addRole(title, salary, department_id).then((results) => {
            return mainMenu();
        })
        .catch((err) => console.error(err));
    });
};

function newEmployee() {
    let employeeQuestions = newEmployeeQuestions;
    getRoles()
    .then((roles) => {
        employeeQuestions.push(selectRoleQuestion(roles));
        getDepartment()
        .then((department) => {
            employeeQuestions.push(selectDepartmentQuestion(department));
            return inquirer.prompt(employeeQuestions);
        })
        .then((answers) => {
            const {first_name, last_name, role_id } = answers;
            addEmployee(first_name, last_name, role_id).then((result)=> {
                return mainMenu();
            });
        });
    });
};

function updateRole() {
    let updateQuestions =[];
    getEmployees()
    .then((employee) => {
        updateQuestions.push(selectEmployeeQuestion(employee));
        getRoles()
        .then((roles)=> {
            updateQuestions.push(selectRoleQuestion(roles));
            return inquirer.prompt(updateQuestions);
        })
        .then((answers)=> {
            const {id, role_id} = answers;
            updateEmployee(id, role_id).then((result)=>{
                return mainMenu();
            });
        });
    });
};

function selectRoleQuestion(roles) {
    let options = [];
    for (const {Title, Role_ID} of roles){
        const option = {
            name: Title,
            value: Role_ID,
        };
        options.push(option);
    }
    return {
        type: "list",
        name: "role_id",
        message: "Select Employee Role",
        choices: options
    };
};

function selectDepartmentQuestion(departments) {
    let options = [];
    for (const {Department, id} of departments){
        const option = {
            name: Department,
            value: id,
        };
        options.push(option);
    }
    return {
        type: "list",
        name: "department_id",
        message: "Select Department",
        choices: options
    };
};

function selectEmployeeQuestion(employee) {
    let options = [];
    for ( const {first_name, last_name,id } of employee){
        const option = {
            name: first_name + ' ' + last_name,
            value: id
        };
        options.push(option);
    }
    return {
        type: "list",
        name: "id",
        message: "Select Employee",
        choices: options
    };
};

async function remove() {
    let prompt = removeEmployeePrompt;
    getEmployees().then((employees) => {
        console.table(employees);
        return inquirer.prompt(removeEmployeePrompt);
    }).then((answers) => {
        const id = answers;
        deleteEmployee(id).then((result) => {
            console.log('Employee has been deleted successfully');
            return mainMenu();
        });
    //     db.delete('DELETE FROM employee WHERE ?',
    //     {
    //         id: answers.first
    //     },
    //     function (err) {
    //         if(err) throw err;
    //     }
    // )
    });
};

mainMenu();
