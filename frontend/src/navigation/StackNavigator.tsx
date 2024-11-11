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
import LoginEmailScreen from '../screens/login_flow/LoginEmailScreen';
import { SignupProvider } from '../context/SignupContext';
import { LoginProvider } from '../context/LoginContext';

import LoginPasswordScreen from '../screens/login_flow/LoginPasswordScreen';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <LoginProvider>
      <SignupProvider>
        <Stack.Navigator initialRouteName='WelcomeScreen'>
          <Stack.Screen
            name='WelcomeScreen'
            component={WelcomeScreen}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name='LoginEmailScreen'
            component={LoginEmailScreen}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name='LoginPasswordScreen'
            component={LoginPasswordScreen}
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
    </LoginProvider>
  );
}
