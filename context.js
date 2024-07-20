'use client'

import { createContext, React } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children, value }) => {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};