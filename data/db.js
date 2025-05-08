const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a sorpres',
    database: 'blog-db'
});

connection.connect((err) => {

    if (err) throw err;

    console.log('Connesso a MySql');

});

module.exports = connection;