// initial package
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// routes
// users
app.get('/user', async function (req, res) {
    const query = await db`SELECT * FROM users`;

    res.json({
        status: true,
        message: "Get data success",
        data: query
    })
})

// root
app.get('/', function (req, res) {
    res.send('Hello World');
});

// listener
app.listen(3000, () => {
    console.log('App running in port 3000');
})