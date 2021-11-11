const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
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

module.exports= connection;