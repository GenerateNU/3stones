import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/home';
import SecondScreen from '../screens/secondScreen/secondScreen';
import ProfileScreen from '../screens/profile/profile';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='homeScreen'>
      <Stack.Screen
        name='homeScreen'
        component={HomeScreen}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen name='secondScreen' component={SecondScreen} options={{ title: '' }} />
      <Stack.Screen name='profileScreen' component={ProfileScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
