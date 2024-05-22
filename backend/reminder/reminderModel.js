const { Schema, model } = require('mongoose');
const moment = require('moment');

const Reminder = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nameWorkService: { type: String, required: true },
    service: { type: String, required: true },
    brandAuto: { type: String, required: true },
    date: { type: Date, default: Date.now },
    time: { type: String, default: moment().format('HH:mm') } 
});

module.exports = model('Reminder', Reminder);
