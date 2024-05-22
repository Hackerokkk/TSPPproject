const { Schema, model } = require('mongoose');
const User = require('../User/userModel');
const Reminder = require('./reminderModel');

class ReminderController {
    async createReminder(req, res) {
        try {
            const {userId, serviceTitle, serviceCenter, carsBrand, serviceDate, serviceTime } = req.body;

            const newReminder = new Reminder({
                userId: userId,
                nameWorkService: serviceTitle,
                service: serviceCenter,
                brandAuto: carsBrand,
                date: serviceDate,
                time: serviceTime
            });

            await newReminder.save();



            res.status(201).json({ message: "Нагадування створено успішно", reminder: newReminder });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Помилка сервера" });
        }
    }
}

module.exports = new ReminderController();
