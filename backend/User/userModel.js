const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref:'Role'}],
    cars: [{type: Schema.Types.ObjectId, ref: 'Cars'}],
    interval: { type: Schema.Types.ObjectId, ref: 'Interval', required: true },
})

module.exports = model('User', User)