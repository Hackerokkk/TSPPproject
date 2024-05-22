const {Schema, model} = require('mongoose')

const Interval = new Schema({
    oil: {type: Number, required: true, default: 10000},
    coolant: {type: Number, required: true, default: 160000},
    brakePads: {type: Number, required: true, default: 25000},
    brakeFluid: {type: Number, required: true, default: 40000},
    fuelFilter: {type: Number, required: true, default: 30000},
    airFilter: {type: Number, required: true, default: 30000},
    sparkPlugs: {type: Number, required: true, default: 30000},
    timingChain: {type: Number, required: true, default: 150000},
})

module.exports = model('Interval', Interval)