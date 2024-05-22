const cron = require('node-cron'); 
const EmailService = require('./email.service'); 
const CarsModel = require('../Сars/carsModel'); 
const UserModel = require('../User/userModel');


async function checkAndSendEmails() {
    try {
        const cars = await CarsModel.find().populate('userId');
        for (const car of cars) {
            const user = car.userId; 
            if (user && user.email && user.username) {
                const currentDate = new Date();
                const mileageDate = new Date(car.date_mileage);

                if (mileageDate.getTime() < currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) {
                    await EmailService.sendActivationMail(user.email, user.username, car.brand, car.model);
                    console.log("Email Sent");
                }
            }
        }
    } catch (error) {
        console.error("Error checking and sending emails:", error);
    }
}




cron.schedule('00 09 * * *', () => {
    checkAndSendEmails();
}, {
    scheduled: true,
    timezone: 'Europe/Kiev' 
});

module.exports = cron;
