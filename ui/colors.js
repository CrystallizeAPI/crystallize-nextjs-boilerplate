import { darken } from 'polished';

export const colors = new Proxy(
  {
    defrost: '#f47f98',
    iceberg: '#B7E2E4',
    frost: '#f3f4f6',
    frostbite: '#4c505b',
    glacier: '#8FDDCA',
    new: '#F79F79',
    handled: '#3496A0',
    dispatched: '#69A2B0',
    delivered: '#87B6A7',
    red: '#EF4836',
    error: '#EF4836',
    light: '#dfdfdf',
    roboto: "'Roboto', sans-serif",
    varela: "'Varela', sans-serif",

    darkText: '#4c505b',
    lightText: '#fff',
    prettyPink: '#F9C3C7',
    price: darken(0.2, '#8FDDCA')
  },
  {
    get: function(obj, prop) {
      if (prop in obj) {
        return obj[prop];
      }

      console.warn(`colors.${prop} is not available`);

      return '#000';
    }
  }
);
