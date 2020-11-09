import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export function sendEmail(args = {}) {
  if (SENDGRID_API_KEY) {
    return sgMail.send(args);
  } else {
    console.log('Sendgrid API key not defined. Email not sent to', args.to);
  }
}
