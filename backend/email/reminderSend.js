const cron = require('node-cron');
const EmailServiceRem = require('./email.serviceRem');
const Reminder = require('../reminder/reminderModel');
const User = require('../User/userModel');

async function checkAndSendEmails() {
    try {
        const reminders = await Reminder.find();
        const currentDate = new Date();

        for (const reminder of reminders) {
            const reminderDate = new Date(reminder.date);

            if (isSameDate(currentDate, reminderDate)) {
                const user = await User.findById(reminder.userId);
                if (user && user.email && user.username) {
                    await EmailServiceRem.sendReminderEmail(user.email, user.username, reminder);
                    console.log("Email Sent");
                }
            }
        }
    } catch (error) {
        console.error("Error checking and sending emails:", error);
    }
}

cron.schedule('24 13 * * *', () => {
    checkAndSendEmails();
}, {
    scheduled: true,
    timezone: 'Europe/Kiev'
});

module.exports = cron;

function isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}
