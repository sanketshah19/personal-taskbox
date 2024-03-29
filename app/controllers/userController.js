const {User} = require('../models/user')
const _ = require('lodash')

module.exports.register = function(req, res){
    const {body} = req
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send(_.pick(user, ['_id', 'username', 'email']))
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.login = function(req, res){
    const {body} = req
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({token})
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.logout = function(req, res){
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token}}})
        .then((token) =>{
            res.send({notice: 'Successfully logged out'})
        })
        .catch((err) => {
            res.send(err)
        })
}