var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(
    {
        service: 'Hotmail',
        auth: {
                user: 'badem3444@hotmail.com',
                pass: 'Caglaymn123'
            }
    }
);

var mailOption = 
{
    from: 'badem3444@hotmail.com',
    to: 'mert.iecevit@gmail.com, mert.ecevit@hotmail.com',
    cc: 'mertilhan.ecevit@khas.edu.tr',
    subject: 'Node.js ile mail atiyorum!',
    text: 'Hello World!'
}

transporter.sendMail(mailOption, function(err, info){

    if(err) throw err;

    console.log("Mail gönderildi" + info.messageId);
});