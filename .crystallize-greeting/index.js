const fs = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const supportsColor = require('supports-color');
const chalk = require('chalk');
const inquirer = require('inquirer');
const emoji = require('node-emoji');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

async function envFileExists() {
  try {
    await stat(join(__dirname, '..', './.env'));
    return true;
  } catch (error) {}
  return false;
}

(async function init() {
  try {
    if (process.env.CRYSTALLIZE_TENANT_ID) {
      return;
    }

    const exists = await envFileExists();
    if (exists) {
      return;
    }

    if (supportsColor.stdout) {
      console.log(await readFile(join(__dirname, './logo.txt'), 'utf8'));
    }

    const themeColor = chalk.rgb(244, 127, 152);

    console.log(
      themeColor.bold(
        emoji.emojify(':sparkles:  Welcome awesome developer! :sparkles:\n')
      )
    );

    const { shopToUse } = await inquirer.prompt([
      {
        type: 'list',
        name: 'shopToUse',
        message: 'Which shop do you want to use?',
        choices: [
          {
            value: 'demo',
            name: 'The demo shop - prefilled with lots of data'
          },
          'My very own tenant please'
        ]
      }
    ]);

    const envFileVars = [
      'CRYSTALLIZE_API_URL=https://api.crystallize.com',
      'CRYSTALLIZE_API_TOKEN=4a9154575f38ad98f2bb227a9fb4a77f',
      'PORT=3000',
      'GTM_ID=',
      'KLARNA_MODE=test',
      'KLARNA_MERCHANT_ID=1',
      'KLARNA_STORE_NAME=test',
      'KLARNA_SHARED_SECRET=test',
      'KLARNA_TERMS_URI=https://example.com',
      'KLARNA_RECURRING_TOKEN='
    ];

    if (shopToUse !== 'demo') {
      const { tenantId, tenantToken } = await inquirer.prompt([
        {
          type: 'input',
          name: 'tenantId',
          message: 'Your tenant ID',
          default: 'demo'
        },
        {
          type: 'input',
          name: 'tenantToken',
          message: 'Your super secret tenant token',
          default: '1234'
        }
      ]);
      envFileVars.push(
        `CRYSTALLIZE_TENANT_ID=${tenantId}`,
        `CRYSTALLIZE_API_TOKEN=${tenantToken}`
      );
    } else {
      envFileVars.push('CRYSTALLIZE_TENANT_ID=demo', 'CRYSTALLIZE_API_TOKEN=');
    }

    // Set the env file
    await writeFile(join(__dirname, '..', './.env'), envFileVars.join('\n'));

    // Remove greeting from package.json
    const packageJson = await readFile(
      join(__dirname, '../', './package.json'),
      'utf8'
    );
    const packageJsonObj = JSON.parse(packageJson);
    delete packageJsonObj.scripts.postinstall;
    await writeFile(
      join(__dirname, '../', './package.json'),
      JSON.stringify(packageJsonObj, null, 3),
      'utf-8'
    );

    console.log(
      emoji.emojify('\n\nWell done! :muscle:  Your shop is set to go! :star:')
    );

    console.log(`
To start in development mode: ${themeColor('npm run dev')} or ${themeColor(
      'yarn dev'
    )}
To start in ${chalk.italic('super fast')} production mode: ${themeColor(
      'npm run prod'
    )} or ${themeColor('yarn prod')}
      `);

    console.log(
      chalk.hex('#dadada')(
        `\nYour settings are saved in the root .env file\n\n`
      )
    );
  } catch (error) {
    console.log('Oh no. An error occured in the Crystallize greeting script.');
    console.log(error);
  }
})();
