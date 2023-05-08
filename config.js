const postgres = require('postgres');

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'pijar_cooking',
    username: 'postgres',
    password: 'J0K4M313354icui4cu',
});

module.exports = sql;