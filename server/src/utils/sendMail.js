const nodemailer = require('nodemailer');

// Enter the data for the mailing into the constants
// EMAIL_HOST - smtp host
// EMAIL_HOST_PASSWORD - host passsword
// EMAIL_HOST_USER - it's basically your e-mail address
// EMAIL_PORT - it's port, for example, google port 587

const EMAIL_HOST = 'smtp.gmail.com';
const EMAIL_HOST_PASSWORD = 'eqev hlwp uwsx rxoc';
const EMAIL_HOST_USER = 'puga.vitaliy@gmail.com';
const EMAIL_PORT = 587;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  auth: {
    user: EMAIL_HOST_USER,
    pass: EMAIL_HOST_PASSWORD
  }      
});

module.exports.sendEmail = async(reciever, message, offerId) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_HOST_USER,
      to: reciever,
      subject: 'Message from squadhelp exam',
      text: message,
      html: message === 'approve'
        ? `<b style="color:green;font-size:24px;">Your offer with id ${offerId} was ${message}d</b>`
        : `<b style="color:red;font-size:24px;">Your offer with id ${offerId} was ${message}ed</b>`
    });

    return info.messageId
  } catch(e) {
    return e;
  }
}

