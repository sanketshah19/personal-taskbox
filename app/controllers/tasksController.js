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