const express = require('express');
const router = new express.Router();
const task = require('../controllers/tasks_controller');

router.get('/tasks', (req, res) => { task.index(res); });
router.get('/tasks/:id', (req, res) => { task.show(req, res); });
router.post('/tasks', (req, res) => { task.create(req, res); });
router.patch('/tasks/:id', (req, res) => { task.update(req, res); });
router.delete('/tasks/:id', (req, res) => { task.destroy(req, res); });

module.exports = router;
