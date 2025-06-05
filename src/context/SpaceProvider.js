'use client'

import { createContext, React } from 'react'

export const SpaceContext = createContext();

export const AppProvider = ({ children, value }) => {
  return (
    <SpaceContext.Provider value={value}>
      {children}
    </SpaceContext.Provider>
  );
};