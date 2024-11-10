import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/home';
import SecondScreen from '../screens/secondScreen/secondScreen';
import WelcomeScreen from '../screens/login_flow/WelcomeScreen';
import EmailInputScreen from '../screens/login_flow/EmailInputScreen';
import PasswordInputScreen from '../screens/login_flow/PasswordInputScreen';
import UserDetailsScreen from '../screens/login_flow/UserDetailsScreen'; // Add other screens as needed
import ConnectAccountsScreen from '../screens/login_flow/ConnectAccountsScreen';
import InvestmentPlanScreen from '../screens/login_flow/InvestmentPlanScreen';
import { SignupProvider } from '../context/SignupContext';

import ProfileScreen from '../screens/profile/profile';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <SignupProvider>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name='EmailInputScreen'
          component={EmailInputScreen}
          options={{ title: 'Enter Your Email' }}
        />
        <Stack.Screen
          name='PasswordInputScreen'
          component={PasswordInputScreen}
          options={{ title: 'Create a Password' }}
        />
        <Stack.Screen
          name='UserDetailsScreen'
          component={UserDetailsScreen}
          options={{ title: 'Your Details' }}
        />
        <Stack.Screen
          name='ConnectAccountsScreen'
          component={ConnectAccountsScreen}
          options={{ title: 'Your Details' }}
        />
        <Stack.Screen
          name='InvestmentPlanScreen'
          component={InvestmentPlanScreen}
          options={{ title: 'Your Details' }}
        />
        <Stack.Screen
          name='homeScreen'
          component={HomeScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name='secondScreen'
          component={SecondScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </SignupProvider>
  );
}
