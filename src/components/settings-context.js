import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  language: 'en',
  currency: 'eur',
  mainNavigation: [],
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  language: lang,
  currency: cur,
  mainNavigation,
  children,
}) => {
  const {
    query: { language: langFromUrl },
  } = useRouter();
  const [language, setLanguage] = useState(lang || langFromUrl);
  const [currency, setCurrency] = useState(cur);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency, mainNavigation }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
