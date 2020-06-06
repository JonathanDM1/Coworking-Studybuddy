const nodemailer = require('nodemailer');

let CONFIG = {
    SERVICE: 'gmail',
    USER: 'planitwm2@gmail.com',
    PASS: 'byksih-pitciw-5nygpA'
}

let transporter = nodemailer.createTransport({
    service: CONFIG.SERVICE,
    auth:{
        user: CONFIG.USER,
        pass: CONFIG.PASS
    }
});

module.exports.transporter = transporter;