const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class EmailService {
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

  async sendActivationMail(to, user, brand, model) {
    const result = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Оновлення пробігу на вебсайті Service Car`,
      text: "",
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h2>
          Привіт ${user}
        </h2>
        <div style="display: flex; flex-direction: column;">
          <p style="text-align: center;">
          <h3>
           Нагадуємо що для автомобіля ${brand} ${model} потрібно оновити пробіг.<br />
           Натисніть на кнопку для того щоб перейти на сайт для оновлення пробігу:
          </h3>
           </p>
        </div>
        <a
        style="
        font-weight: 500; 
        margin: 5px auto; 
        padding: 10px 15px; 
        background-color: cadetblue; 
        border-radius: 5px; 
        text-decoration: none; 
        color: white; 
        display: inline-block;
        "
        href="${process.env.HOST}"
      >
        Перейти на сайт
      </a>
     </div>
      `,
    });

    return result;
  }
}

module.exports = new EmailService();