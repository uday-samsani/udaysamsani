const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
require('dotenv').config();

const sendVerificationMail = ({ user, token }) => {
    console.log('in mail');
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
            ? 'https://udaysamsani.codes/verify/' + token
            : 'http://localhost:3000/verify/' + token;
    nodemailerMailgun.sendMail(
        {
            from: 'UdaySamsani <no-reply@udaysamsani.codes>',
            to: `${user.username} <${user.email}>`,
            subject: '[Uday Samsani] Please verify your email address',
            template: 'verify-email',
            'v:url': url,
        },
        (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(info);
            }
        }
    );
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
            ? 'https://udaysamsani.codes/verify/' + token
            : 'http://localhost:3000/verify/' + token;
    nodemailerMailgun.sendMail(
        {
            from: 'Uday Samsani <no-reply@udaysamsani.codes>',
            to: `${user.username} <${user.email}>`,
            subject: '[Uday Samsani] Please reset your password',
            template: 'template.verification-mail',
            'h:X-Mailgun-Variables': `{url:${url}}`,
        },
        (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(info);
            }
        }
    );
};

module.exports = { sendVerificationMail, sendPasswordResetMail };
