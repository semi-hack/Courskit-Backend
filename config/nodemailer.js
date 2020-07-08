const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '924284597e233b',
        pass: 'fb87bc3681ef35'
    }
});

module.exports = { transporter }