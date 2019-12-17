const express = require('express');
const router = new express.Router();
const task = require('../controllers/tasks_controller');
const auth = require('../middlewares/auth');

router.get('/tasks', auth, (req, res) => { task.index(req, res); });
router.get('/tasks/:id', auth, (req, res) => { task.show(req, res); });
router.post('/tasks', auth, (req, res) => { task.create(req, res); });
router.patch('/tasks/:id', auth, (req, res) => { task.update(req, res); });
router.delete('/tasks/:id', auth, (req, res) => { task.destroy(req, res); });

module.exports = router;
