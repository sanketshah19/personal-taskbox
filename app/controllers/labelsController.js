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

module.exports.show = function(req, res){
    const id = req.params.id
    Label.findOne({_id: id, user: req.user._id})
            .then((label) => {
                if(label){
                    res.send(label)
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
    Label.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
            .then((label) => {
                if(label){
                    res.send(label)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}