const nodemailer = require('nodemailer');
//const mg = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "testd20202@gmail.com",
        pass: "Something",
    }
})

module.exports = { transporter } 
