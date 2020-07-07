const fs = require('fs-extra');

/**
 * If this project is installed using Vercel import,
 * the env CRYSTALLIZE_TENANT_IDENTIFIER will be set.
 */
if (process.env.CRYSTALLIZE_TENANT_IDENTIFIER) {
  console.log('-- Setting up project for quick preview on Vercel--');

  process.chdir(__dirname);

  let env = fs.readFileSync('../.env', 'utf-8');
  env = env.replace(
    /NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER=(.+)/,
    `NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER=${process.env.CRYSTALLIZE_TENANT_IDENTIFIER}`
  );

  fs.writeFileSync('../.env', env);

  /**
   * Reduce payment providers to 1, since that will get
   * the lambda count to below 12, which will make
   * this project available with the Vercel hobby plan
   */
  let appConfig = JSON.parse(fs.readFileSync('../app.config.json', 'utf-8'));
  appConfig.paymentProviders.length = 1;
  fs.writeFileSync('../app.config.json', JSON.stringify(appConfig, null, 3));

  // Execute cleanup
  require('./cleanup-payment-providers');
}
