const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {

    sendMail: function sendMail(subject, content, callback) {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAILS_TO,
            subject: subject,
            html: "<html>" + content + "</html>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }
}




