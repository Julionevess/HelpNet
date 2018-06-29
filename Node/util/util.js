const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    //host: 'smtp.gmail.com',
    //port: 465,
    //proxy: 'http://arrays200.sefaz.pe.gov.br:8080/',
    auth: {
        user: "speedupsolution@gmail.com",
        pass: "sp33d$olu"
    },
    tls: { rejectUnauthorized: false }
  });
  
  const mailOptions = {
    from: 'speedupsolution@gmail.com',
    to: 'julionevess@gmail.com',
    subject: 'E-mail enviado usando Node!',
    html: '<h1>Título</h1><p>Texto!</p>'
  };
  
  module.exports = {
  
    sendMail: function sendMail(message, callback) {
        console.log(message);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email enviado: ' + info.response);
            }
        });
    }
}




