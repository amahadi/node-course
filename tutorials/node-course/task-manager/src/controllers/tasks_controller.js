const Task = require('../models/task_model');
const responseBuilder = require('../utils/response_builder');

const index = async (res) => {
    try{
        tasks = await Task.find({});
        res.send({status: responseBuilder(200), tasks});
    } catch(e){ res.status(500).send({status: responseBuilder(500)}); }
}

const show = async (req, res) => {
    const _id = req.params.id;
    try{
        task = await Task.findById(_id);
        if(!task) { return res.status(404).send({status: responseBuilder(404)}); }
        res.send({status: responseBuilder(200), task});
    } catch(e){
        res.status(500).send({status: responseBuilder(500)});
    }
}

const create = async (req, res) => {
    const task = new Task(req.body);
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
        const task = await Task.findById(req.params.id);
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
        task = await Task.findByIdAndDelete(req.params.id);
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
