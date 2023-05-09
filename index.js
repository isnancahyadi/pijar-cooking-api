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
    try {
        const query = await db`SELECT * FROM users`;

        response(200, 'OK', 'Get all data success', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    
    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const query = await db`SELECT * FROM users WHERE id = ${id}`;

        if (!query?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        } else {
            response(200, 'OK', 'Get data success', query, res);
        }
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.post('/user', async (req, res) => {
    const {fullname, email, password, phoneNumber, profilePicture} = req.body;

    if (!(fullname && email && password && phoneNumber)) {
        response(400, 'ERROR', 'Please complete all of field', [], res);
        return;
    }

    let payLoad, query;

    try {
        if (profilePicture === undefined) {
            payLoad = {fullname, email, password, phoneNumber};
            query = await db`INSERT INTO users ${db(payLoad, "fullname", "email", "password", "phoneNumber")} returning *`;
        } else {
            payLoad = {fullname, email, password, phoneNumber, profilePicture};
            query = await db`INSERT INTO users ${db(payLoad, "fullname", "email", "password", "phoneNumber", "profilePicture")} returning *`;
        }
    
        response(201, 'OK', 'User has been created', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.patch('/user/:id', async (req, res) => {
    const {
        params: {id},
        body: {fullname, email, password, phoneNumber, profilePicture}
    } = req;

    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const getSelectedData = await db`SELECT * FROM users WHERE id = ${id}`;

        if (!getSelectedData?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        }

        const payLoad = {
            fullname: fullname ?? getSelectedData[0].fullname,
            email: email ?? getSelectedData[0].email,
            password: password ?? getSelectedData[0].password,
            phoneNumber: phoneNumber ?? getSelectedData[0].phoneNumber,
            profilePicture: profilePicture ?? getSelectedData[0].profilePicture
        };
    
        const query = await db`UPDATE users set ${db(payLoad, "fullname", "email", "password", "phoneNumber", "profilePicture")} WHERE id = ${id} returning *`;
    
        response(201, 'OK', 'User has been updated', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const getSelectedData = await db`SELECT * FROM users WHERE id = ${id}`;

        if (!getSelectedData?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        }

        const query = await db`DELETE FROM users WHERE id = ${id} returning *`;

        response(200, 'OK', 'User has been deleted', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

// recipes
app.get('/recipe', async (req, res) => {
    try {
        const query = await db`SELECT * FROM recipes`;

        response(200, 'OK', 'Get all data success', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.get('/recipe/:id', async (req, res) => {
    const id = req.params.id;
    
    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const query = await db`SELECT * FROM recipes WHERE id = ${id}`;

        if (!query?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        } else {
            response(200, 'OK', 'Get data success', query, res);
        }
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.post('/recipe', async (req, res) => {
    const {title, ingredients, image, video} = req.body;

    if (!(title && ingredients && image)) {
        response(400, 'ERROR', 'Please complete all of field', [], res);
        return;
    }

    let payLoad, query;

    try {
        if (video === undefined) {
            payLoad = {title, ingredients, image};
            query = await db`INSERT INTO recipes ${db(payLoad, "title", "ingredients", "image")} returning *`;
        } else {
            payLoad = {title, ingredients, image, video};
            query = await db`INSERT INTO recipes ${db(payLoad, "title", "ingredients", "image", "video")} returning *`;
        }
    
        response(201, 'OK', 'Recipe has been created', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.patch('/recipe/:id', async (req, res) => {
    const {
        params: {id},
        body: {title, ingredients, image, video}
    } = req;

    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const getSelectedData = await db`SELECT * FROM recipes WHERE id = ${id}`;

        if (!getSelectedData?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        }

        const payLoad = {
            title: title ?? getSelectedData[0].title,
            ingredients: ingredients ?? getSelectedData[0].ingredients,
            image: image ?? getSelectedData[0].image,
            video: video ?? getSelectedData[0].video
        };

        const query = await db`UPDATE recipes set ${db(payLoad, "title", "ingredients", "image", "video")} WHERE id = ${id} returning *`;

        response(201, 'OK', 'Recipe has been updated', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
    }
});

app.delete('/recipe/:id', async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        response(400, 'ERROR', 'Invalid ID', [], res);
        return;
    }

    try {
        const getSelectedData = await db`SELECT * FROM recipes WHERE id = ${id}`;

        if (!getSelectedData?.length) {
            response(404, 'ERROR', 'ID not found', [], res);
            return;
        }

        const query = await db`DELETE FROM recipes WHERE id = ${id} returning *`;

        response(200, 'OK', 'Recipe has been deleted', query, res);
    } catch (error) {
        response(500, 'ERROR', 'Error in server', [], res);
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