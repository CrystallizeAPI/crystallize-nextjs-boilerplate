const jwt = require('jsonwebtoken');
const mjml2html = require('mjml');
const { users, secret } = require('./helpers');

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
  const { email } = req.query;

  const token = jwt.sign({ email }, secret, {
    expiresIn: '36000s'
  });
  const hostUrl = `${req.headers['x-forwarded-proto']}://${
    req.headers['x-forwarded-host']
  }`;
  const magicLink = `${hostUrl}/api/verify/${token}`;

  const exists = users.some(u => u.token === token);
  if (exists === false) users.push({ email, token });

  const formattedEmail = formatEmail(magicLink);
  // Ready to send email

  /* eslint-disable */
  console.log(formattedEmail);
  console.log('----');
  console.log('Login Link: ' + magicLink);
  console.log('----');
  /* eslint-enable */

  if (!email) {
    return res.status(400).send({ message: 'No email provided' });
  }

  return res.status(200).send({
    message: 'Email sent! The verification link is only valid for 1 hour'
  });
};
