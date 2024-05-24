import sgMail from '@sendgrid/mail';
import * as database from '~/shared/database';

const sendEmail = async (to, from, subject, html) => {
  const msg = {
    to,
    from,
    subject,
    text: html, // TODO: Convert the html content into plaintext
    html
  };
  sgMail.setApiKey(process.env.SENDGRID_APIKEY); // TODO: Let the user provide his SendGrid API key and use that instead of a master key
  return await sgMail.send(msg)
}

export const runAction = async (wf, event) => {
  if (wf.action === 'email') {
    const { body: html, subject } = wf.settings.emailTemplate;
    const to = event.customerEmail;
    const from = process.env.FROM_EMAIL; // TODO: Let the user chose which email to use (on his domain) and use that email instead of a master email
    const timestamp = new Date();
    console.log(`Email sent to ${to} at ${timestamp}`)
    await sendEmail(to, from, subject, html);
    await database.addToSent(wf, event, timestamp);
  } else {
    console.log('Action not implemented:', wf.action);
  }
  // TODO: implement more action types
}
