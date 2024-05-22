const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class EmailServiceRem {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      authMethod: 'LOGIN'
    });
  }

  async sendReminderEmail(email, username, reminder) {
    const { nameWorkService, service, brandAuto, date, time } = reminder;
    const result = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email, 
      subject: `Нагадування: ${nameWorkService} - ${service}`,
      text: "",
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h1>Привіт ${username}! </h1>
        <h2>Нагадування про відвідування автосервісу</h2>
        <p>Автомобіль: ${brandAuto}</p>
        <p>Тип роботи: ${nameWorkService}</p>
        <p>Назва сервісу: ${service}</p>
        <p>Дата: ${new Date(date).toLocaleDateString()}</p>
        <p>Час: ${time}</p>
      </div>
      `,
    });

    return result;
  }
}

module.exports = new EmailServiceRem(); 
