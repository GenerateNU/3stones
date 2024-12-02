import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileLegalDocumentsScreen from '../screens/profile/ProfileLegalDocumentsScreen';
import WithdrawScreen from '../screens/profile/WithdrawScreen';
import DepositScreen from '../screens/profile/DepositScreen';
import ConfirmScreen from '../screens/profile/ConfirmScreen';

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
        component={ConfirmScreen}
        initialParams={{ withdraw: true }} // Pass withdraw as true
        options={{ title: 'Withdraw Confirm', headerShown: true }}
      />
      <Stack.Screen
        name='profile-deposit'
        component={DepositScreen}
        options={{ title: 'Deposit', headerShown: true }}
      />
      <Stack.Screen
        name='profile-deposit-confirm'
        component={ConfirmScreen}
        initialParams={{ withdraw: false }} // Pass withdraw as false
        options={{ title: 'Deposit Confirm', headerShown: true }}
      />
    </Stack.Navigator>
  );
}
