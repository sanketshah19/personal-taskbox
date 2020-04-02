const Task = require('../models/tasks')

module.exports.list = function(req, res){
    Task.find({user: req.user._id})
        .then((tasks) => {
            res.send(tasks)
        })
        .catch((err) => {
            res.send(err)
        })
}