import nodemailer from "nodemailer";

interface SendMailProps {
  to: string;
  name: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: SendMailProps) => {
  const { GMAIL_USER, GMAIL_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
  } catch (error) {
    console.error(error);
    return;
  }

  const options = {
    from: "GMAIL_USER",
    to,
    subject,
    html,
  };

  try {
    const sendResult = await transport.sendMail(options);
  } catch (error) {
    console.error(error);
    return;
  }
};

// export const compileWelcomeTemplate = (
//   name: string,
//   url: string,
//   companyName: string
// ) => {
//   const template = handlebars.compile(welcomeTemplate);
//   const htmlBody = template({
//     name: name,
//     confirmationLink: url,
//     companyName: companyName,
//   });
//   return htmlBody;
// };
