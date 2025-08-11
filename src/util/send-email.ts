import nodemailer from "nodemailer";
import config from "../config";

// /**
//  * Sends an email using Nodemailer.
//  *
//  * @param to - The recipient's email address.
//  * @param subject - The subject of the email.
//  * @param html - The HTML content of the email.
//  */
export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: Number(config.smtp.port) || 587,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  /**
   * Send the email using the transporter.
   * The 'from' field combines a display name and an email address.
   */
  await transporter.sendMail({
    from: `"${config.smtp.from_name}" <${config.smtp.from_email}>`,
    to,
    subject,
    html,
  });
};
