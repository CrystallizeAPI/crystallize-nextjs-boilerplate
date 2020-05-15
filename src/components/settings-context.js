import React, { useState, useContext } from 'react';

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  language: 'en',
  currency: 'eur',
  mainNavigation: []
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  language: lang,
  currency: cur,
  mainNavigation,
  children
}) => {
  const [language, setLanguage] = useState(lang);
  const [currency, setCurrency] = useState(cur);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency, mainNavigation }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
