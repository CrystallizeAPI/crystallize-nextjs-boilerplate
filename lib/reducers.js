export default {
  app: (
    state = { frontpageHeading: 'Welcome to your Crystallize shop!' },
    { type }
  ) => {
    switch (type) {
      case 'EXAMPLE_ACTION':
        return {
          ...state
        };
      default:
        return state;
    }
  }
};
