const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:"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"
//     }
// }))

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '924284597e233b',
        pass: 'fb87bc3681ef35'
    }
});

module.exports = { transporter }