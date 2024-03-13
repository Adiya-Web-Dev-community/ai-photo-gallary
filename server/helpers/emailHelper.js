const nodemailer = require("nodemailer");

const sendOtpMail = (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Account created successfully",
    text: `
                      Welcome to the Task Hour.,
                      Thank you for choosing us!
                      Your OTP is ${otp}
                      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error };
    } else {
      return resp.json({ success: true, message: info.response });
    }
  });
};

// Request confirmation email
const requestConfirmationEmail = (email, name, user) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reqeust Confirmation Email",
    text: `
					  Hey ${name},
					  Thank you for choosing us!
					  ${user}
					  `,
  };
};
const sendEventMails = (email, eventDescription, pin, eventName, eventLink) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Invitation to ${eventName}`,
    html: `<p>${eventDescription}</p><p>${pin}</p><p><a href="${eventLink}">Event Link</a></p>`,
  };
};
// Requested images link generated
const requestedEmailImagesLink = (email, link, name, eventName, user) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Ohoo!! Your images of ${eventName} have been uploaded`,
    text: `
					  Hey ${name},
					  Your images of ${eventName} have been uploaded. Please follow below link -> :)
					  ${link}
					  Thank you for choosing us!
					  ${user}
					  `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error };
    } else {
      return resp.json({ success: true, message: info.response });
    }
  });
};

const eventConfirmation = (email, name, event, qrCode, qrlink) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  console.log("hi");

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Request Confirmation Email",
    html: `
	<p>Images are ready </p>
	<p>Event ${event},</p>
	${qrCode}
	<img src='${qrCode}' alt='QR Code' />
	<p>Link - ${qrlink}</p>
	  `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error };
    } else {
      return resp.json({ success: true, message: info.response });
    }
  });
};

module.exports = {
  sendOtpMail,
  eventConfirmation,
  sendEventMails
};
