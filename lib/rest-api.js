require('es6-promise').polyfill();
require('isomorphic-fetch');

const root = 'https://jsonplaceholder.typicode.com';

async function getFrontpageData() {
  try {
    const response = await fetch(`${root}/todos`);
    const todos = await response.json();
    return {
      shopName: 'My awesome shop',
      todos
    };
  } catch (error) {
    console.error(error); // eslint-disable-line
    return {};
  }
}

async function getUserPageData() {
  try {
    const response = await fetch(`${root}/users/1`);
    const user = await response.json();
    return {
      shopName: 'My awesome shop',
      user
    };
  } catch (error) {
    console.error(error); // eslint-disable-line
    return {};
  }
}

module.exports = {
  getFrontpageData,
  getUserPageData
};
