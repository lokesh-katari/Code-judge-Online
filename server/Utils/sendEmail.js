const nodemailer =require('nodemailer');

const sendEmail =async (options)=>{
         console.log("this is inside of sendEmail func");
         console.log(process.env.SMTP_MAIL);
         console.log(process.env.SMTP_PASSWORD);
         const transporter =nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            // service:process.env.SMTP_SERVICE,
            auth:{
                user:process.env.SMTP_MAIL,
                pass:process.env.SMTP_PASSWORD,
            },
            
         });
         const mailOptions ={
            from:process.env.SMTP_MAIL,
            to:options.email,
            subject:options.subject,
            text:options.message
         }
        await  transporter.sendMail (mailOptions,(res)=>{
         res.send("email sent");
        });
}
         // await transporter.sendMail(mailOptions);

module.exports =sendEmail