/**
 * When run, this file will analyze the payment providers
 * in the config against the code, and remove the
 * unused providers
 */

const fs = require('fs-extra');
const handlebars = require('handlebars');

(function cleanupPaymentProviders() {
  process.chdir(__dirname);

  const config = JSON.parse(fs.readFileSync('../app.config.json', 'utf-8'));

  // Remove files and directories not in use
  [
    '../src/lib-api/payment-providers',
    '../src/page-components/checkout/payment',
    '../src/pages/confirmation',
    '../src/pages/[locale]/confirmation',
    '../src/pages/api/payment-providers'
  ].forEach(function cleanupDir(dirPath) {
    try {
      const entries = fs.readdirSync(dirPath);

      entries.forEach(function handleEntry(entry) {
        const onlyName = entry.replace(/\.js$/, '');
        if (
          onlyName !== 'index' &&
          !config.paymentProviders.includes(onlyName)
        ) {
          fs.removeSync(`${dirPath}/${entry}`);
          console.log('Removed', `${dirPath}/${entry}`);
        }
      });
    } catch (e) {
      console.log('Skipping', dirPath);
    }
  });

  // Remove unused content of files
  ['../src/page-components/checkout/payment/index.js'].forEach(
    function cleanupFile(filePath) {
      let contents = fs.readFileSync(filePath, 'utf-8');

      /**
       * Prepare for Handlebars execution
       * All handlebar expressions are inside comments, e.g.:
       * // {{#if some-value}}
       * We need to remove the comment slashes before running
       * Handlebars
       */
      contents = contents.replace(/\/\/ {{/g, '{{');

      contents = handlebars.compile(contents)(
        config.paymentProviders.reduce(
          (acc, p) => ({ ...acc, ['payment-provider-' + p]: true }),
          {}
        )
      );

      fs.writeFileSync(filePath, contents, 'utf-8');
      console.log('Updated', filePath);
    }
  );
})();
