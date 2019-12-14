const express = require('express');
const multer = require('multer')
const router = new express.Router();
const auth = require('../middlewares/auth');
const user = require('../controllers/users_controller');

router.get('/users', auth, (req, res) => user.index(res));
router.get('/users/me', auth, (req, res) => user.profile(req, res));
router.get('/users/:id', (req, res) => user.show(req, res));
router.post('/users', (req, res) => user.create(req, res));
router.patch('/users/me', auth, (req, res) => user.update(req, res));
router.delete('/users/me', auth, (req, res) => user.destroy(req, res));

router.post('/users/login', async (req, res) => { user.login(req, res); });
router.post('/users/logout', auth, async (req, res) => user.logout(req, res));
router.post('/users/logoutAll', auth, async (req, res) => user.logoutAll(req, res));

const upload = multer({
    dest: 'avatars'
});

router.post('/users/me/avatar', upload.single('avatar'), async (req, res) => user.upload(req, res));

module.exports = router;
