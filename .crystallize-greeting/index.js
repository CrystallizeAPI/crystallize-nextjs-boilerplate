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
            value: 'teddy-bear-shop',
            name: 'The teddy bear shop - prefilled with lots of teddy bears'
          },
          'My very own tenant please'
        ]
      }
    ]);

    const envVars = {
      CRYSTALLIZE_GRAPH_URL_BASE: 'https://graph.crystallize.com',
      CRYSTALLIZE_TENANT_ID: 'teddy-bear-shop'
    };

    if (shopToUse !== 'demo') {
      const { tenantId, tenantToken } = await inquirer.prompt([
        {
          type: 'input',
          name: 'tenantId',
          message: 'Your tenant ID',
          default: 'teddy-bear-shop'
        }
      ]);
      envVars.CRYSTALLIZE_TENANT_ID = tenantId;
      envVars.SECRET = 'secret';
    }

    // Set the env file
    const envFileVars = Object.keys(envVars).map(
      key => `${key}=${envVars[key]}`
    );
    await writeFile(
      join(__dirname, '..', './.env'),
      envFileVars.join('\n') + '\n'
    );

    // Update now.json
    const nowJson = await readFile(
      join(__dirname, '../', './now.json'),
      'utf8'
    );
    const nowJsonObj = JSON.parse(nowJson);
    nowJsonObj.env = envVars;
    await writeFile(
      join(__dirname, '../', './now.json'),
      JSON.stringify(nowJsonObj, null, 2) + '\n',
      'utf-8'
    );

    // Remove greeting from package.json
    const packageJson = await readFile(
      join(__dirname, '../', './package.json'),
      'utf8'
    );
    const packageJsonObj = JSON.parse(packageJson);
    delete packageJsonObj.scripts.postinstall;
    await writeFile(
      join(__dirname, '../', './package.json'),
      JSON.stringify(packageJsonObj, null, 2) + '\n',
      'utf-8'
    );

    console.log(
      emoji.emojify('\n\nWell done! :muscle:  Your shop is set to go! :star:')
    );

    console.log(`
      To start in development mode: ${themeColor('npm run dev')}
      To start in ${chalk.italic('super fast')} production mode: ${themeColor(
      'npm run prod'
    )}
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
