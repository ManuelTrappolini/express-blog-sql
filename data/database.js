const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'http://127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'blog'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');

})
module.exports = connection;