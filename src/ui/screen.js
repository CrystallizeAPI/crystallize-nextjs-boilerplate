// Screen sizes
export const screen = new Proxy(
  {
    xs: 500,
    sm: 768,
    md: 1024,
    lg: 1600,
    get xsMin() {
      return this.xs;
    },
    get xsMax() {
      return this.sm - 1;
    },
    get smMin() {
      return this.sm;
    },
    get smMax() {
      return this.md - 1;
    },
    get mdMin() {
      return this.md;
    },
    get mdMax() {
      return this.lg - 1;
    },
    get lgMin() {
      return this.lg;
    },
  },
  {
    get: function (obj, prop) {
      if (prop in obj) {
        return obj[prop];
      }

      if (!['$$typeof', 'prototype'].includes(prop)) {
        console.warn(`screen.${prop} is not available`);
      }

      return 1;
    },
  }
);
