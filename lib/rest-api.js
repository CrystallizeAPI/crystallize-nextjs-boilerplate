require('es6-promise').polyfill();
require('isomorphic-fetch');

const root = 'https://jsonplaceholder.typicode.com';

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
  getUserPageData
};
