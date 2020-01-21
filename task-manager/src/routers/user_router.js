const express = require('express');
const multer = require('multer');
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
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('Please upload a proper image file!'));
        }
        cb(undefined, true)
    }

});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = '';
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.send({error: error.message});
})

module.exports = router;
