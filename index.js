// initial package
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config');
const response = require('./response');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// routes
// users
app.get('/user', async (req, res) => {
    const query = await db`SELECT * FROM users`;
    response(200, 'OK', 'Get all data success', query, res);
});

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    
    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    const query = await db`SELECT * FROM users WHERE id = ${id}`;

    if (!query?.length) {
        response(404, 'ERROR', 'ID not found', [], res);
        return;
    } else {
        response(200, 'OK', 'Get data success', query, res);
    }
});

// root
app.get('/', function (req, res) {
    res.send('Hello World');
});

// listener
app.listen(3000, () => {
    console.log('App running in port 3000');
})