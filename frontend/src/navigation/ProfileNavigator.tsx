import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileLegalDocumentsScreen from '../screens/profile/ProfileLegalDocumentsScreen';
import WithdrawScreen from '../screens/profile/WithdrawScreen';
import WithdrawConfirmScreen from '../screens/profile/WithdrawConfirmScreen'; // Ensure this path is correct

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName='profile'>
      <Stack.Screen
        name='profile'
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false }}
      />
      <Stack.Screen
        name='profile-legal-documents'
        component={ProfileLegalDocumentsScreen}
        options={{ title: 'Legal Documents', headerShown: true }}
      />
      <Stack.Screen
        name='profile-withdraw'
        component={WithdrawScreen}
        options={{ title: 'Withdraw', headerShown: true }}
      />
      <Stack.Screen
        name='profile-withdraw-confirm'
        component={WithdrawConfirmScreen}
        options={{ title: 'Withdraw', headerShown: true }}
      />
    </Stack.Navigator>
  );
}
