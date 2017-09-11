var nodemailer = require('nodemailer');

this.createMailer = function createMailer(user) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'app.tattoome@gmail.com',
                pass: '100%AppleJuice'
            }
        });

        let mailOptions = {
            from: '"Tattoo-Me" <app.tattoome@gmail.com>',
            to: user.email, // user email address
            subject: 'Your Design Is Ready!',
            text: '',
            html: `     
            <h1>Download Ready</h1>
        
            <p>Your design is ready for download. <a href="${user.hdUrl}">Download Here</a></p>
            <p>You can use this link to download your design at any time during the next 7 days. After 7 days, yiou can visit your purchased area and generate a new download link.</p>
        `
        };

        transporter.sendMail(mailOptions, (info) => {
            // console.log('Message send %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
}