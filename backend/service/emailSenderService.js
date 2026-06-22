const fs = require('fs')
const nodemailer = require('nodemailer')
/*

// for stand alone testing use this

dotenv.config({path: '../.env'});

// in noraml case api.js is the access point
// therefore it will inject the env variables into this 

*/
const templateAdjustedData = async function(templatePath,toReplaceObject){
    let templateContent = await fs.promises.readFile(templatePath,'utf-8');
    const keysArr = Object.keys(toReplaceObject);

    keysArr.forEach((key) => {
        templateContent = templateContent.replace(`#{${key}}`,toReplaceObject[key]);
    });

    return templateContent
}

const sendEmailservice = async function(templatePath, recieverEmail, toReplaceObject, type) {
    try {
        const content = await templateAdjustedData(templatePath, toReplaceObject);
        const sendGridDetails = {
            host: "smtp.sendgrid.net",
            port: 465,
            secure: true,
            auth: {
                user: "apikey",
                pass: process.env.SENDGRID_API_KEY
            }
        }
        const msg = {
            to: recieverEmail,
            from: 'arshitsharma177@gmail.com', 
            subject: (type==="otp")?'OTP for resetting the password':`Welcome to StreamVault ${toReplaceObject.name}`,
            text: (type==="otp")?`Your OTP is ${toReplaceObject.otp}. It's valid for 10 minutes.`:`Welcome to StreamVault ${toReplaceObject.name}`,
            html: content
        }
        const transporter = nodemailer.createTransport(sendGridDetails);
        await transporter.sendMail(msg);
    } catch (err) {
        console.log("email not send because of the error", err);
    }
}

/*

//it is better practive to use a general tool like NodeMailer
// which uses service of some kind to send email like that of sendgrid
// so that switching of services becomes easy

const sendEmailservice = async function(templatePath,receiverEmail,toReplaceObject){

    const content = await templateAdjustedData(templatePath,toReplaceObject);

    const msg = {
        to: receiverEmail,
        from: 'arshitsharma177@gmail.com', 
        subject: 'OTP for reseting the password',
        text: `Your OTP is ${toReplaceObject.otp}. It's valid for 10 minutes.`,
        html: content
    }

    sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

*/

module.exports = sendEmailservice;