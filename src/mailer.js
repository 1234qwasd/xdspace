import {
    EMAIL_ENABLED,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_REJECT_UNAUTHORIZED,
    EMAIL_FROM,
    EMAIL_SIGNATURE
} from '../config.js';
import nodemailer from 'nodemailer';

/**
 * Setup Nodemailer transport.
 */
const transporter = EMAIL_ENABLED ? nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE, // upgrade later with STARTTLS
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: EMAIL_REJECT_UNAUTHORIZED
  }
}): null;

export const sendMail = async (address, subject, content) => {
    if(!transporter) {
        throw new Error('Mail is not enabled.');
    }

    if(process.env.NODE_ENV != 'production') {
        console.log(`Email '${subject}' sent to ${address}`);
    }

    return await transporter.sendMail({
        from: EMAIL_FROM,
        text: `${content}\n\n${EMAIL_SIGNATURE}`,
        to: address,
        subject
    });
}
