class MailgunService{

    constructor() {
        require('dotenv').config();
        const nodemailer = require('nodemailer');
        const mailGun = require('nodemailer-mailgun-transport');
        const auth = {
            auth: {
                api_key: process.env.MAILGUN_APIKEY,
                domain: process.env.MAILGUN_DOMAIN
            }
        };
        this.transporter = nodemailer.createTransport( mailGun(auth) );

    }

    async send(to, subject, text="", html=""){
        let mailOptions = {
            from: 'iBlock <mailgun@iblockapp.me>',
            to: to,
            subject: subject,
            text: text,
            html: html
        };
        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = MailgunService;
