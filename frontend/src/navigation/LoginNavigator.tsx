import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/login/WelcomeScreen';
import EmailInputScreen from '../screens/login/signup_flow/EmailInputScreen';
import PasswordInputScreen from '../screens/login/signup_flow/PasswordInputScreen';
import UserDetailsScreen from '../screens/login/signup_flow/UserDetailsScreen'; // Add other screens as needed
import ConnectAccountsScreen from '../screens/login/signup_flow/ConnectAccountsScreen';
import { AuthProvider } from '../context/AuthContext';
import LoginEmailScreen from '../screens/login/login_flow/LoginEmailScreen';
import LoginPasswordScreen from '../screens/login/login_flow/LoginPasswordScreen';
import LegalInformationScreen from '../screens/login/signup_flow/LegalInformationScreen';
import QuestionsScreen from '../screens/login/signup_flow/QuestionsScreen';
import NavProgressBar from '../screens/login/components/NavProgressBar';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name='EmailInputScreen'
          component={EmailInputScreen}
          options={{ title: 'Enter Your Email', headerShown: true, header: (props) => {
            return (
              <NavProgressBar currentStep={1} totalSteps={6} buttonType={'back'} onPress={() => props.navigation.goBack()} />
            )
          }}}
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
          name='LoginEmailScreen'
          component={LoginEmailScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name='LoginPasswordScreen'
          component={LoginPasswordScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name='LegalInformationScreen'
          component={LegalInformationScreen}
          options={{ title: 'Legal Info' }}
        />
        <Stack.Screen
          name='QuestionsScreen'
          component={QuestionsScreen}
          options={{ title: 'Questions Screen' }}
        />
      </Stack.Navigator>
  );
}
