const mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'rest_api_nodejs',
    port : '8889'
});

exports.db = db;