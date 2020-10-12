import React, { useContext } from 'react';

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  mainNavigation: []
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ mainNavigation, children }) => {
  return (
    <SettingsContext.Provider value={{ mainNavigation }}>
      {children}
    </SettingsContext.Provider>
  );
};
