const Task = require('../models/tasks')

module.exports.list = function(req, res){
    Task.find({user: req.user._id}).populate('labels')
        .then((tasks) => {
            res.send(tasks)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = function(req, res){
    const {body} = req
    const task = new Task(body)
    task.user = req.user._id
    task.populate('labels').execPopulate()
    task.save()
        .then((task) => {
            res.send(task)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.show = function(req, res){
    const {id} = req.params
    Task.findOne({_id: id, user: req.user._id}).populate('labels')
        .then((task) => {
            if(task){
                res.send(task)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.update = function(req, res){
    const {body} = req, {id} = req.params
    Task.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true}).populate('labels')
        .then((task) => {
            if(task){
                res.send(task)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.destroy = function(req, res){
    const {id} = req.params
    Task.findOneAndDelete({_id: id, user: req.user._id})
        .then((task) => {
            if(task){
                res.send(task)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}