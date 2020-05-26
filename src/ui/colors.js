export const colors = new Proxy(
  {
    frost: '#f3f4f6',
    black: '#000',
    error: '#EF4836',
    light: '#dfdfdf',
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
