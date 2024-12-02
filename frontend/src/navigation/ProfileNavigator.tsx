import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileLegalDocumentsScreen from '../screens/profile/ProfileLegalDocumentsScreen';
import TransactionScreen from '../screens/profile/TransactionScreen';
import ConfirmScreen from '../screens/profile/ConfirmScreen';

type ProfileNavigatorParamList = {
  profile: undefined;
  'profile-legal-documents': undefined;
  'profile-transaction': { withdraw: boolean }; // Define withdraw parameter
  'profile-withdraw-confirm': { withdraw: boolean };
  'profile-deposit-confirm': { withdraw: boolean };
};

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

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
        name='profile-transaction'
        component={TransactionScreen}
        options={({ route }) => ({
          title: route.params.withdraw ? 'Withdraw' : 'Deposit', // Dynamic title
          headerShown: true,
        })}
      />
      <Stack.Screen
        name='profile-withdraw-confirm'
        component={ConfirmScreen}
        initialParams={{ withdraw: true }} // Pass withdraw as true
        options={{ title: 'Withdraw Confirm', headerShown: true }}
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
