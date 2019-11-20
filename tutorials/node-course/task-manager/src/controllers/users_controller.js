const User = require('../models/user_model');
const responseBuilder = require('../utils/response_builder');

const index = async (res) => {
    try{
        users = await User.find({})
        res.send({status: responseBuilder(200), users});
    } catch(e) {
        res.status(500).send({status: responseBuilder(500)});
    }
}

const profile = async (req, res) => {
    try{
         user = req.user;
         res.send({status: responseBuilder(200), user, token: req.token});
    } catch(e){
        res.send({status: responseBuilder(e.message)});
    }
}

const show = async (req, res) => {
    const _id = req.params.id;
    try{
        user = await User.findById(_id)
        if(!user){ return res.status(404).send({status: responseBuilder(404)}); }
        res.send({status: responseBuilder(200), user});
    } catch(e){
        res.status(500).send({status: responseBuilder(500)});
    }
}

const create = async (req, res) => {
    const user = new User(req.body);
    try{
        await user.generateAuthToken();
        await user.save();
        res.status(201).send({status: responseBuilder(201), user, token: req.token });
    } catch(e) {
        res.status(400).send({status: responseBuilder(400), message: e.message});
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation){
        return res.status(400).send({status: responseBuilder(400)});
    }
    try{
        const user = req.user;
        updates.forEach((update) => user[update] = req.body[update]);
        if(!user){ return res.status(404).send({status: responseBuilder(404)}); }
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.send({status: responseBuilder(200), user, token: req.token});
    } catch(e) {
        res.status(400).send({status: responseBuilder(400)});
    }
}

const destroy = async (req, res) => {
    try{
        await req.user.remove();
        res.send({status: responseBuilder(200), user: req.user})
    } catch(e) {
        res.status(400).send({status: responseBuilder(400)});
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        await user.generateAuthToken();
        await user.save();
        res.send({ status: responseBuilder(200), user, token: user.token});
    } catch(e) {
        res.send({status: responseBuilder(e.message)});
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token);
        await req.user.save();
        res.send({status: responseBuilder(200)});
    } catch(e) {
        res.status(500).send({status: responseBuilder(500)});
    }
}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({status: responseBuilder(200)});
    } catch(e) {
        res.send({status: responseBuilder(422), additionalMessage: e.message});
    }
}

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
    login: login,
    profile: profile,
    logout: logout,
    logoutAll: logoutAll
}
