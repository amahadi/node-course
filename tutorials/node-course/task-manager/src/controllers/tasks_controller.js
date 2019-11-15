const Task = require('../models/task_model');

const index = (res) => {
    Task.find({}).then((tasks) => {
        res.send({ code: 200, message: 'success', tasks });
    }).catch((e) => {
        res.status(500).send({ code: 500, message: e.message });
    });
}

const show = (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if(!task) { return res.status(404).send({ code: 404, message: 'not found'}); }
        res.send({ code: 200, message: 'success', task });
    }).catch((e) => {
        res.status(500).send({ code: 500, message: e.message });
    }); 
}

const create = (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(200).send({ code: 200, message: 'success', task });
    }).catch((e) => {
        res.status(400).send({ code: 400, message: e.message });
    });
}

const update = (req, res) => {
    const _id = req.params.id;
    const task = Task.findByIdAndUpdate(_id, res.body).then((task) => {
        res.send({code: 200, meaasge: 'success', task});
    }).catch((e) => {
        res.status(e.code).send({code: e.code, message: e.message});
    });
}

const destroy = (req, res) => {
    const _id = req.params.id;
    const task = Task.findByIdAndDelete(_id).then((task) => {
        res.send({code: 200, message: 'success', task});
    }).catch((e) => {
        res.status(e.code).send({code: e.code, message: e.message})
    });
}


module.exports = {
    index: index, 
    show: show,
    create: create,
    update: update,
    destroy: destroy
}