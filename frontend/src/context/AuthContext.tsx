import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';

// Type for the context (defines the shape of the context data)
type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  loginData: { email: string; password: string };
  signupData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    ssn?: string; // Optional to match signupData default state
    address: {
      addressLine: string;
      city: string;
      zipCode: string;
      country: string;
    };
    questions: { [key: string]: string[] }; // A flexible type for questions
  };
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateLoginData: (field: string, value: string) => void;
  updateSignupData: (key: string, value: any) => void;
  isInSignupFlow: boolean;
  setIsInSignupFlow: (value: boolean) => void;
};


// Initialize the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    ssn: '',
    address: {
      addressLine: '',
      city: '',
      zipCode: '',
      country: '',
    },
    questions: {},
  });
  const [isInSignupFlow, setIsInSignupFlow] = useState(false);

  // Fetches the current session from Supabase when the app loads and stores it in the session state.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log(`IsInSignupflow: ${isInSignupFlow}`)
  }, [isInSignupFlow])

  // signs in the user with email and password
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setSession(data.session);
  };

  // signs up the user with email and password
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setSession(data.session);
  };

  // signs out the user
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
  };

  // updates the login data
  const updateLoginData = (field: string, value: string) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };
  

  // updates the signup
  const updateSignupData = (key: string, value: any) => {
    setSignupData((prevData) => {
      if (key.includes('.')) {
        const keys = key.split('.');
        const [parentKey, childKey] = keys;
        return {
          ...prevData,
          [parentKey]: {
            ...prevData[parentKey],
            [childKey]: value,
          },
        };
      }
      return { ...prevData, [key]: value };
    });
  };

  // Provide the context data to the children
  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        loginData,
        signupData,
        login,
        signUp,
        signOut,
        updateLoginData,
        updateSignupData,
        isInSignupFlow,
        setIsInSignupFlow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Provides an easy way to access AuthContext in components.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

