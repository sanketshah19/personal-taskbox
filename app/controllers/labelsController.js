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