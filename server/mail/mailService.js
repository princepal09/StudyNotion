
const dns = require("dns")
dns.setDefaultResultOrder("ipv4first")

const nodemailer = require("nodemailer");
require("dotenv").config();



console.log("MAIL_HOST =", process.env.MAIL_HOST);

dns.lookup(process.env.MAIL_HOST, { all: true }, (err, addresses) => {
  console.log("DNS RESULTS:", addresses);
});

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})


exports.mailSender = async (email, title, body) => {
    try {

        let info = await transporter.sendMail({
            from: "StudyNotion || By Prince Pal",
            to: email,
            subject: title,
            html: body,
        });
        console.log(info);
        return info;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
