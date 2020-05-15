export const colors = new Proxy(
  {
    defrost: '#f47f98',
    iceberg: '#B7E2E4',
    frost: '#f3f4f6',
    black: '#000',
    error: '#EF4836',
    light: '#dfdfdf',
    grey: '#efefef',

    darkText: '#4c505b',
    price: '#d79b59',
  },
  {
    get: function (obj, prop) {
      if (prop in obj) {
        return obj[prop];
      }

      if (!['$$typeof', 'prototype'].includes(prop)) {
        console.warn(`colors.${prop} is not available`);
      }

      return '#000';
    },
  }
);
