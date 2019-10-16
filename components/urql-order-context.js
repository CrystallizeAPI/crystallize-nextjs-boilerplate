import React from 'react';
import { createClient } from 'urql';

export const UrqlOrderContext = React.createContext();

const UrqlOrderProvider = ({ children }) => {
  const urqlClient = createClient({
    url: 'https://api-dev.crystallize.digital/nerdenough/orders'
  });
  return (
    <UrqlOrderContext.Provider value={urqlClient}>
      {children}
    </UrqlOrderContext.Provider>
  );
};

export default UrqlOrderProvider;
