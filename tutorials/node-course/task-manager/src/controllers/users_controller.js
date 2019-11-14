const User = require('../models/user_model');

const index = (res) => {
    User.find({}).then((users) => {
        res.send({code: 200, message: 'success', users})
    }).catch((e) => {
        res.status(500).send({code: 500, message: e.message});
    });
}

const show = (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if(!user){ return res.status(404).send( {status: 404, message: 'No user found!'}); }
        res.send({ status: 200, message: 'success', user});
    }).catch(() => {
        res.status(500).send({code: 500, message: e.message});
    });
}

const create = (req, res) => {
    const user = new User(req.body);
    user.save().then(() => { res.send(
        { code: 200, message: 'success', user });
    }).catch((errors) => {
        res.status(400).send({code: 400, message: errors.message });
    });
}

module.exports = {
    index: index,
    show: show,
    create: create
}