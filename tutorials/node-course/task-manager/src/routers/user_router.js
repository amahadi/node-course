const express = require('express');
const router = new express.Router();
const user = require('../controllers/users_controller');

router.get('/users', (req, res) => { user.index(res); });
router.get('/users/:id', (req, res) => { user.show(req, res); });
router.post('/users', (req, res) => { user.create(req, res); });
router.patch('/users/:id', (req, res) => { user.update(req, res); });
router.delete('/users/:id', (req, res) => {user.destroy(req, res); });

router.post('/users/login', async (req, res) => {user.login(req, res)});

module.exports = router;
