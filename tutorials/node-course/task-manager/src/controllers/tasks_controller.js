const Task = require('../models/task_model');
const codes = require('../utils/response_codes')

const index = async (res) => {
    try{
        tasks = await Task.find({});
        res.send({status: codes._200, tasks});
    } catch(e){ res.status(500).send({status: codes._500}); }
}

const show = async (req, res) => {
    const _id = req.params.id;
    try{
        task = await Task.findById(_id);
        if(!task) { return res.status(404).send({status: codes._404}); }
        res.send({status: codes._200, task});
    } catch(e){
        res.status(500).send({status: codes._500});
    }
}

const create = async (req, res) => {
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(200).send({status: codes._200, task});
    } catch(e){
        res.status(400).send({status: codes._400});
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation){
        return res.status(400).send({status: codes._400});
    }
    try{
        const task = await Task.findById(req.params.id);
        // task = await Task.findByIdAndUpdate(req.params.id, req.body , { new: true, runValidators: true });
        if(!task) { return res.status(404).send({status: codes._404}); }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send({status: codes._200, task});
    } catch(e){
        res.status(500).send({status: codes._500});
    }
}

const destroy = async (req, res) => {
    try{
        task = await Task.findByIdAndDelete(req.params.id);
        if(!task) { return res.status(404).send({status: codes._404}); }
        res.send({ status: codes._200, task });
    } catch(e){
        res.status(e.code).send({status: codes._500})
    }
}

module.exports = {
    index: index, 
    show: show,
    create: create,
    update: update,
    destroy: destroy
}
