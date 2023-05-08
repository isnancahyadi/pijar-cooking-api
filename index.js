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
app.get('/', function (req, res) {
    res.send('Hello World');
});

// listener
app.listen(3000, () => {
    console.log('App running in port 3000');
})