const sgMail = require('@sendgrid/mail');

const sendVerificationMail = async ({ user, token }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const url =
        process.env.NODE_ENV === 'production'
            ? 'https://udaysamsani.codes/verify/' + token
            : 'http://localhost:3000/verify/' + token;
    const mail = {
        from: 'Uday Samsani <no-reply@udaysamsani.codes>',
        to: user.email,
        subject: '[Uday Samsani] Please verify your email address',
        templateId: 'd-59cdaea053fd4c6ca4a33c56fa2fed15',
        dynamicTemplateData: {
            name: user.firstname + ' ' + user.lastname,
            url,
        },
        categories: ['Transactional', 'Verification Mail'],
    };
    try {
        await sgMail.send(mail);
    } catch (error) {
        console.log(error);
    }
};

const sendPasswordResetMail = async ({ user, token }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const url =
        process.env.NODE_ENV === 'production'
            ? 'https://udaysamsani.codes/password-reset/' + token
            : 'http://localhost:3000/password-reset/' + token;
    const mail = {
        from: 'Uday Samsani <no-reply@udaysamsani.codes>',
        to: user.email,
        subject: '[Uday Samsani] Please reset your password',
        templateId: 'd-ae6ec4386c2745c9ac5bab740a5d1787',
        dynamicTemplateData: {
            name: user.firstname + ' ' + user.lastname,
            url,
        },
        categories: ['Transactional', 'Password Reset'],
    };
    try {
        await sgMail.send(mail);
    } catch (error) {}
};

module.exports = { sendVerificationMail, sendPasswordResetMail };
