import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/BottomTabs'

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}