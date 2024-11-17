import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/login/WelcomeScreen';
import EmailInputScreen from '../screens/login/EmailInputScreen';
import PasswordInputScreen from '../screens/login/PasswordInputScreen';
import UserDetailsScreen from '../screens/login/UserDetailsScreen'; // Add other screens as needed
import ConnectAccountsScreen from '../screens/login/ConnectAccountsScreen';
import InvestmentPlanScreen from '../screens/login/InvestmentPlanScreen';
import { SignupProvider } from '../context/SignupContext';
import SampleLoginScreen from '../screens/login/SampleLoginScreen';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
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
          name='LoginScreen'
          component={SampleLoginScreen}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </SignupProvider>
  );
}
