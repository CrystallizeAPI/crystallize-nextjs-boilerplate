import jwt from 'jsonwebtoken';
import mjml2html from '@nerdenough/mjml-ncc-bundle';
import sgMail from '@sendgrid/mail';

const secret = process.env.SECRET;
const tenantName = process.env.CRYSTALLIZE_TENANT_ID;
const sendGridApiKey = process.env.SENDGRID_API_KEY;

const formatEmail = loginLink =>
  mjml2html(
    `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>Welcome to ${tenantName}! Simply follow the link below to login.</mj-text>
          <mj-button href="${loginLink}" align="center">Click here to login</mj-button>
          <mj-text>${loginLink}</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`,
    {}
  );

export default async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'No email provided' });
  }

  const token = jwt.sign({ email }, secret, {
    expiresIn: '36000s'
  });

  const {
    'x-forwarded-proto': protocol,
    'x-forwarded-host': host
  } = req.headers;

  const hostUrl = `${protocol}://${host}`;
  const magicLink = `${hostUrl}/api/verify/${token}`;

  // Here we would want to check whether a user already exists with the email
  // provided. This boilerplate does not have a datastore connected to it yet
  // so we will assume that the user exists. If the user doesn't exist this
  // would also be a good place to create the new user.
  //
  // The token should also be saved somewhere so that we can verify that it
  // is a valid token in `./verify.js`.

  const { html } = formatEmail(magicLink);

  // Now that we have an email formatted to contain the magic link we want to
  // send it. If configured to use SendGrid, an email will be sent with the
  // login link. If not, the link will be logged to console.
  if (sendGridApiKey) {
    sgMail.setApiKey(sendGridApiKey);
    await sgMail.send({
      to: email,
      from: 'example@crystallize.com',
      subject: 'Magic Link',
      html
    });
  }

  /* eslint-disable */
  console.log(`Login Link: ${magicLink}`);
  /* eslint-enable */

  return res.json({
    message: 'Email sent! The verification link will expire in 1 hour'
  });
};
