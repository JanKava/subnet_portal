var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'P0w3rful!',
    database: 'subnets'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('DB connection created succesfully.');
});

module.exports=connection;