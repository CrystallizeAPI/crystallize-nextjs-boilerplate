require('es6-promise').polyfill();
require('isomorphic-fetch');

const root = 'https://jsonplaceholder.typicode.com';

function getFrontpageData() {
  return new Promise(resolve => {
    fetch(`${root}/photos/1`)
      .then(response => response.json())
      .then(photo => {
        resolve({
          shopName: 'My awesome shop',
          bannerImage: {
            src: photo.url,
            title: photo.title,
            alt: photo.title
          }
        });
      });
  });
}

function getUserPageData() {
  return new Promise(resolve => {
    fetch(`${root}/users/1`)
      .then(response => response.json())
      .then(user => {
        resolve({
          shopName: 'My awesome shop',
          user
        });
      });
  });
}

module.exports = {
  getFrontpageData,
  getUserPageData
};
