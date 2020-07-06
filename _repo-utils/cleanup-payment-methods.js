/**
 * When run, this file will analyze the payment methods
 * in the config against the code, and remove the
 * unused payment methods
 */

const fs = require('fs-extra');
const handlebars = require('handlebars');

(function cleanupPaymentMethods() {
  process.chdir(__dirname);

  const config = JSON.parse(fs.readFileSync('../app.config.json', 'utf-8'));

  // Remove files and directories not in use
  function cleanupDir(dirPath) {
    const entries = fs.readdirSync(dirPath);

    entries.forEach(function handleEntry(entry) {
      const onlyName = entry.replace(/\.js$/, '');
      if (onlyName !== 'index' && !config.paymentMethods.includes(onlyName)) {
        fs.removeSync(`${dirPath}/${entry}`);
        console.log('Removed', `${dirPath}/${entry}`);
      }
    });
  }

  [
    '../src/lib-api/payment-providers',
    '../src/page-components/checkout/payment',
    '../src/pages/confirmation',
    '../src/pages/api/payment-providers'
  ].forEach(cleanupDir);

  // Remove unused content of files
  function cleanupFile(filePath) {
    let contents = fs.readFileSync(filePath, 'utf-8');

    // Prepare Handlebar syntax
    contents = contents.replace(/\/\/ {{/g, '{{');

    const template = handlebars.compile(contents);

    contents = template(
      config.paymentMethods.reduce(
        (acc, p) => ({ ...acc, ['payment-method-' + p]: true }),
        {}
      )
    );

    fs.writeFileSync(filePath, contents, 'utf-8');
    console.log('Updated', filePath);
  }

  ['../src/page-components/checkout/payment/index.js'].forEach(cleanupFile);
})();
