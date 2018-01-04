function getFrontpageData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        shopName: 'My awesome shop',
        bannerImage: {
          src: '//lorempixel.com/1200/400',
          title: 'Awesome image'
        }
      });
    }, 10);
  });
}

function getPage2Data() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        shopName: 'My awesome shop',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt ut labore et dolore magna
                 aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                 aute irure dolor in reprehenderit in voluptate velit esse
                 cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                 cupidatat non proident, sunt in culpa qui officia deserunt
                 mollit anim id est laborum`
      });
    }, 2000);
  });
}

module.exports = {
  getFrontpageData,
  getPage2Data
};
