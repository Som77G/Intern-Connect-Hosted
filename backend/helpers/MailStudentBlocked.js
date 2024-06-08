const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const MailStudentBlocked = async({email, first_name, last_name, message}) => {
    try {
        const myEmail = process.env.MY_EMAIL;
        const myPassword = process.env.MY_PASSWORD;

        // Create a transporter object for nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPassword
            }
        });

        const mailOptions = {
            from: myEmail, 
            to: email,
            subject: 'Not Applicable to Apply More through SIP Portal',
            html: `<p>Dear ${first_name} ${last_name}, your SIP Portal has been blocked and you are no longer applicable to apply for more jobs due to following reason: ${message}</p> `
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);

        console.log("Mail has been sent");
        return mailResponse;
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({
            status: 500,
            error: "Internal Server Error"
        }));
    }
}

module.exports = {MailStudentBlocked};
