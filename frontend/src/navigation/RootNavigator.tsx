import React from 'react';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './BottomTabs';
import LoginNavigator from './LoginNavigator';

// Navigates user to the log in screen if seesion is not found (i.e. user not logged in)
export default function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null; // or some loading screen (maybe we make in future?)
  }

  return session ? <TabNavigator /> : <LoginNavigator />;
}
