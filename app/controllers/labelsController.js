const Label = require('../models/labels')

module.exports.list = function(req, res){
    Label.find({user: req.user._id})
            .then((labels) => {
                res.send(labels)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.create = function(req, res){
    const values = Array.isArray(req.body) ? req.body : [req.body]
    const labels = values.map((body) => {
        const label = new Label(body)
        label.user = req.user._id
        return label
    })
    Label.insertMany(labels)
            .then((labels) => {
                res.send(labels)
            })
            .catch((err) => {
                res.send(err)
            })
}