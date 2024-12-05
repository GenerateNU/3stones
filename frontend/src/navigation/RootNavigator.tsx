import React from 'react';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './BottomTabs';
import LoginNavigator from './LoginNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectNavigator from './ProjectNavigator';

const Stack = createNativeStackNavigator();

// Navigates user to the log in screen if seesion is not found (i.e. user not logged in)
export default function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null; // or some loading screen (maybe we make in future?)
  }

  return session ? (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Tabs" component={TabNavigator} />
      <Stack.Screen options={{headerShown: false}} name="project" component={ProjectNavigator} />
    </Stack.Navigator>
  ) : <LoginNavigator />;
}
