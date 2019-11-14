const express = require('express');
require('./db/mongoose');
const user = require('./controllers/users_controller');
const task = require('./controllers/tasks_controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', (req, res) => { user.index(res); });
app.get('/users/:id', (req, res) => { user.show(req, res); });
app.post('/users', (req, res) => { user.create(req, res); });

app.get('/tasks', (req, res) => { task.index(res); });
app.get('/tasks/:id', (req, res) => { task.show(req, res); });
app.post('/tasks', (req, res) => { task.create(req, res); });

app.listen(port, () => { console.log('Listening on ' + port); });