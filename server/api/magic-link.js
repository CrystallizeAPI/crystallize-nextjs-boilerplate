const jwt = require('jsonwebtoken');
const mjml2html = require('mjml');

const secret = process.env.SECRET;
const tenantName = process.env.CRYSTALLIZE_TENANT_ID;

const formatEmail = loginLink =>
  mjml2html(
    `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Welcome to ${tenantName}
            <mj-button href="${loginLink}" align="center">
              Click here to login
            </mj-button>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`,
    {}
  );

module.exports = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'No email provided' });
  }

  const token = jwt.sign({ email }, secret, {
    expiresIn: '36000s'
  });

  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const magicLink = `${hostUrl}/api/verify/${token}`;

  // Here we would want to check whether a user already exists with the email
  // provided. This boilerplate does not have a datastore connected to it yet
  // so we will assume that the user exists. If the user doesn't exist this
  // would also be a good place to create the new user.
  //
  // The token should also be saved somewhere so that we can verify that it
  // is a valid token in `./verify.js`.

  const formattedEmail = formatEmail(magicLink);

  // Now that we have an email formatted to contain the magic link we want to
  // send it. Because the boilerplate is not configured with an SMTP server or
  // another mail service to use, we will just log the message to the console
  // for development.

  /* eslint-disable */
  console.log(formattedEmail);
  console.log('----');
  console.log(`Login Link: ${magicLink}`);
  console.log('----');
  /* eslint-enable */

  return res.json({
    message: 'Email sent! The verification link will expire in 1 hour'
  });
};
