//OWN MODULES
const mailConfig = require('../../config/mail/mailConfig');
const MAIL = require('../../config/stringConstants/mailConstants');

function contactMail(data){
    let mailOptions = {
        from: MAIL.MAIL_TEXT.FROM,
        to: data.email,
        subject: 'Uw vraag: ' + data.subject + '.',
        text: MAIL.MAIL_TEXT.CONTACT_BODY + genOverviewOfInput(data) +  '.' 
    };
    send(mailOptions);
}

function registerMail(data){
    let mailOptions = {
        from: MAIL.MAIL_TEXT.FROM,
        to: data,
        subject: 'Registratie PLANIT',
        text: MAIL.MAIL_TEXT.REGISTER_BODY
    }
    send(mailOptions);
}

function genOverviewOfInput(data){
    let overview = "Overzicht\n";
    overview += "Uw naam: " + data.name + "\n\n";
    overview += "Uw voornaam: " + data.surname + "\n\n";
    overview += "Uw e-mailadres: " + data.email + "\n\n";
    overview += "Het onderwerp: " + data.subject + "\n\n";
    overview += "Uw vraag: " + data.question + "\n\n";
    console.log(overview);
    return overview;
}

function send(mailOptions){
    mailConfig.transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err);
        } else {
            console.log("De mail is verzonden");
        }
    });
}

module.exports.contactMail = contactMail;
module.exports.registerMail = registerMail;