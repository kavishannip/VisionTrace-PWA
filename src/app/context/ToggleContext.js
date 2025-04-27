"use client";
import React, { createContext, useState, useContext } from 'react';

// Create the context with a default value
const ToggleContext = createContext({
  activeComponent: 'ocr-text',
  setActiveComponent: () => {},
});

export function ToggleProvider({ children }) {
  const [activeComponent, setActiveComponent] = useState('ocr-text');
  
  const value = {
    activeComponent,
    setActiveComponent
  };

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
}

// Make sure we're exporting the hook correctly
export function useToggle() {
  const context = useContext(ToggleContext);
  
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  
  return context;
}
