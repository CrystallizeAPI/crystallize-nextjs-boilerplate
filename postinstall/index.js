const fs = require('fs');
const { promisify } = require('util');
const { join } = require('path');
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

async function init() {
  const exists = await envFileExists();
  if (!exists) {
    console.log(await readFile(join(__dirname, './logo.txt'), 'utf8'));
    console.log(
      emoji.emojify(':sparkles:  Welcome awesome developer! :sparkles:\n')
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
          'My own tenant'
        ]
      }
    ]);

    const envFileVars = [
      'CRYSTALLIZE_API_URL=http://api.crystallize.digital',
      'PORT=3000'
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

    await writeFile(join(__dirname, '..', './.env'), envFileVars.join('\n'));

    console.log(
      emoji.emojify('\n\nWell done you! :star: :muscle:  You are set to go!')
    );

    console.log(`
To start in development mode: "npm run dev" or "yarn dev"
To start in super fast production mode: "npm run prod" or "yarn prod"
    `);
  }
}

init();
