const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
if (process.env.NODE_ENV !== 'prodction') {
    require('dotenv').config();
}

const sendVerificationMail = ({ user, token }) => {
    const auth = {
        auth: {
            api_key: process.env.MailApiKey,
            domain: 'mg.udaysamsani.codes',
        },
        host: 'api.eu.mailgun.net',
    };
    const nodemailerMailgun = nodemailer.createTransport(mg(auth));
    const url =
        process.env.NODE_ENV === 'production'
            ? 'https://udaysamsani.codes/password-recet/' + token
            : 'http://localhost:3000/password-recet/' + token;
    nodemailerMailgun.sendMail({
        from: 'UdaySamsani <no-reply@udaysamsani.codes>',
        to: `${user.username} <${user.email}>`,
        subject: '[Uday Samsani] Please verify your email address',
        template: 'verify-email',
        'v:url': url,
    });
};

const sendPasswordResetMail = ({ user, token }) => {
    const auth = {
        auth: {
            api_key: process.env.MailApiKey,
            domain: 'mg.udaysamsani.codes',
        },
        host: 'api.eu.mailgun.net',
    };
    const nodemailerMailgun = nodemailer.createTransport(mg(auth));
    const url =
        process.env.NODE_ENV === 'production'
            ? 'https://udaysamsani.codes/password-reset/' + token
            : 'http://localhost:3000/password-reset/' + token;
    nodemailerMailgun.sendMail({
        from: 'UdaySamsani <no-reply@udaysamsani.codes>',
        to: `${user.username} <${user.email}>`,
        subject: '[Uday Samsani] Please reset your password',
        template: 'reset-password',
        'v:url': url,
    });
};

module.exports = { sendVerificationMail, sendPasswordResetMail };
