const db = require('./connection');

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

module.exports = {db, getEmployees, getDepartment, getRoles};

//CONCAT(manager.first_name, " ", manager.id.last_name) 