const fs = require('fs');
const { promisify } = require('util');
const { join } = require('path');

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

async function ensureEnvFile() {
  try {
    await stat(join(__dirname, '..', './.env'));
  } catch (error) {
    await copyFile(
      join(__dirname, '..', './.env.example'),
      join(__dirname, '..', './.env')
    );
  }
}

async function init() {
  ensureEnvFile();

  const logo = await readFile(join(__dirname, './logo.txt'), 'utf8');
  console.log(logo);
  console.log(`Welcome awesome developer!

To start: "npm i" or "yarn"


  `);
}

init();
