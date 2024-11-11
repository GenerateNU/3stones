import React, { createContext, useState } from 'react';

// Create the context
export const LoginContext = createContext();

// Context provider component
export const LoginProvider = ({ children }) => {
  // State for email and password
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Function to update login data
  const updateLoginData = (field, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <LoginContext.Provider value={{ loginData, updateLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};
