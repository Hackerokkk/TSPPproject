const {Schema, model} = require('mongoose')

const Cars = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    brand: {type: String, required: true},
    model: {type: String, required: true},
    mileage: {type: Number, required: true, default: 0},
    date_mileage: { type: Date, default: Date.now },
    year: {type: Number, required: true}
})

module.exports = model('Cars', Cars)
