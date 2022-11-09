const nodemailer = require("nodemailer");
const {google} = require("googleapis");

/*
* class to send emails with gmail Oauth
* */
class GmailService{
    constructor(user, clientId, clientSecret, refreshToken) {
        this.from = user;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
    }

    async send(to, subject, text="", html="") {

        const oAuth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            'https://developers.google.com/oauthplayground'
        );
        oAuth2Client.setCredentials({ refresh_token: this.refreshToken });

        const accessToken = await oAuth2Client.getAccessToken();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.from,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken: this.refreshToken,
                accessToken: accessToken,
            },
        });

        let info = await transporter.sendMail({
            from: this.from,
            to: to,
            subject: subject,
            text: text,
            html: html
        });
        return info.messageId;
    }

}

module.exports = GmailService;

