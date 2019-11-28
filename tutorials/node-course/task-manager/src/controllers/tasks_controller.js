const Task = require('../models/task_model');
const responseBuilder = require('../utils/response_builder');

const index = async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try  {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate({});
        res.send({status: responseBuilder(200), tasks: req.user.tasks});
    } catch(e){ res.status(500).send({status: responseBuilder(500), additionalMessage: e.message}); }
}

const show = async (req, res) => {
    const _id = req.params.id;
    try{
        task = await Task.findOne({ _id, owner: req.user._id });
        if(!task) { return res.status(404).send({status: responseBuilder(404)}); }
        res.send({status: responseBuilder(200), task});
    } catch(e){
        res.status(500).send({status: responseBuilder(500)});
    }
}

const create = async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try{
        await task.save();
        res.status(200).send({status: responseBuilder(200), task});
    } catch(e){
        res.status(400).send({status: responseBuilder(400)});
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation){
        return res.status(400).send({status: responseBuilder(400)});
    }
    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        // task = await Task.findByIdAndUpdate(req.params.id, req.body , { new: true, runValidators: true });
        if(!task) { return res.status(404).send({status: responseBuilder(404)}); }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send({status: responseBuilder(200), task});
    } catch(e){
        res.status(500).send({status: responseBuilder(500)});
    }
}

const destroy = async (req, res) => {
    try{
        task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id });
        if(!task) { return res.status(404).send({status: responseBuilder(404)}); }
        res.send({ status: responseBuilder(200), task });
    } catch(e){
        res.status(e.code).send({status: responseBuilder(500)})
    }
}

module.exports = {
    index: index, 
    show: show,
    create: create,
    update: update,
    destroy: destroy
}
