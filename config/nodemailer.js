const nodemailer = require('nodemailer');
//const mg = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
    }
})

module.exports = { transporter } 
