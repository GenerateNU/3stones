import React, { createContext, useState } from 'react';

// Create the context
export const SignupContext = createContext();

// Create the provider component
export const SignupProvider = ({ children }) => {
  // Define the form data that will be shared across screens
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    investmentPlan: '',
    // Add any other fields you need
  });

  // A helper function to update form data by field
  const updateForm = (key, value) => {
    setFormData((prev) => ({
      ...prev, // Spread previous data to retain it
      [key]: value, // Update the specific field
    }));
  };

  // Return the provider with the formData and updateForm function available
  return (
    <SignupContext.Provider value={{ formData, updateForm }}>{children}</SignupContext.Provider>
  );
};
