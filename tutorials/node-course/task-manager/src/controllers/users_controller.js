const User = require('../models/user_model');
const codes = require('../utils/response_codes')
const responseBuilder = require('../utils/response_builder')

const index = async (res) => {
    try{
        users = await User.find({})
        res.send({status: codes._200, users});
    } catch(e) {
        res.status(500).send({status: codes._500});
    }
}

const show = async (req, res) => {
    const _id = req.params.id;
    try{
        user = await User.findById(_id)
        if(!user){ return res.status(404).send({status: codes._404}); }
        res.send({status: codes._200, user});
    } catch(e){
        res.status(500).send({status: codes._500});
    }
}

const create = async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).send({status: codes._200, user});
    } catch(errors) {
        res.status(400).send({status: codes._400});
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation){
        return res.status(400).send({status: codes._400});
    }
    try{
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!user){ return res.status(404).send({status: codes._404}); }
        res.send({status: codes._200, user});
    } catch(e) {
        res.status(400).send({status: codes._400});
    }
}

const destroy = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){ return res.status(404).send({status: codes._404}); }
        res.send({status: codes._200, user});
    } catch(e) {
        res.status(400).send({status: codes._400});
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = 
        res.send(user);
    } catch(e) {
        res.send(responseBuilder(e.message));
    }
}

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
    login: login
}
