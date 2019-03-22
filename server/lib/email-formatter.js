const mjml2html = require('mjml');

const tenantName = process.env.CRYSTALLIZE_TENANT_ID;

exports.getHtml = loginLink =>
  mjml2html(
    `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Welcome to ${tenantName}
            <mj-button href="${loginLink}" align="center">
              Click here to log in
            </mj-button>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`,
    {}
  );
