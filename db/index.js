const mysql = require('mysql2/promise');

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Hufflepuff0404!',
        database: 'employee_tracker',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
},
console.log('Connected to your employee tracker!')
);

async function getEmployees() {
    const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, 
            roles.title AS title, roles.salary AS salary, 
            department.name AS department, 
            manager_id
            AS manager FROM employee
    INNER JOIN roles ON employee.role_id = roles.id
    INNER JOIN department ON roles.department_id = department.id`;

    const result = await (await db).execute(sql);
    return result[0];
};

async function getDepartment() {
    const sql = `SELECT department.id, department.name AS Department FROM department`

    const result = await (await db).execute(sql);
    return result[0];
};

async function getRoles() {
    const sql = `SELECT roles.id AS Role_ID, roles.title AS Title, roles.salary,  department.name AS Department FROM roles
    LEFT JOIN department
    ON roles.department_id = department.id`

    const result = await (await db).execute(sql);
    return result[0];
};

async function addRole(title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES(?,?,?)`

    const params = [title, salary, department_id]

    const result = await (await db).execute(sql, params);
};

async function addDepartment(name) {
    const sql = `INSERT INTO department (name)
    VALUES(?)`

    const params = [name];

    const result = await (await db).execute(sql, params);
    return console.log("success");
};

async function addEmployee(first_name, last_name, role_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
    VALUES(?, ?, ?)`

    const params = [first_name, last_name, role_id]

    const result = await (await db).execute(sql, params);
    return console.log("success");
};

async function updateEmployee(id, role_id) {
    const sql = `UPDATE employee SET role_id = ?
    WHERE id =?`
    const params = [role_id,id]
    

    const result = await (await db).execute(sql, params);
    return console.log("success");
};

async function deleteEmployee (answer) {
    const sql = `DELETE FROM employee WHERE id = ?`
    const params = [answer.first]

    const result = await (await db).execute(sql, params);
    return console.log("success");
}


module.exports = {db, getEmployees, getDepartment, getRoles, addRole, addDepartment, addEmployee, updateEmployee, deleteEmployee};

//CONCAT(manager.first_name, " ", manager.id.last_name) 