import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileLegalDocumentsScreen from '../screens/profile/ProfileLegalDocumentsScreen';
import TransactionScreen from '../screens/profile/TransactionScreen';
import ConfirmScreen from '../screens/profile/ConfirmScreen';
import ProfileSettingsScreen from '../screens/profile/ProfileSettingsScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';

type ProfileNavigatorParamList = {
  profile: undefined;
  'profile-legal-documents': undefined;
  'profile-transaction': { withdraw: boolean };
  'profile-confirm': { withdraw: boolean };
  'profile-settings': undefined;
  'profile-edit': undefined;
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
        options={{ title: 'Legal Documents', headerShown: false }}
      />
      <Stack.Screen
        name='profile-transaction'
        component={TransactionScreen}
        options={({ route, navigation }) => ({
          title: route.params.withdraw ? 'Withdraw' : 'Deposit',
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('profile')}
              style={{ marginLeft: 16 }}
            >
              <Image
                source={require('../../assets/images/x-icon-default.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='profile-confirm'
        component={ConfirmScreen}
        options={({ route, navigation }) => ({
          title: route.params.withdraw ? 'Withdraw Confirm' : 'Deposit Confirm',
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('profile')}
              style={{ marginLeft: 16 }}
            >
              <Image
                source={require('../../assets/images/x-icon-default.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='profile-settings'
        component={ProfileSettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='profile-edit'
        component={ProfileEditScreen}
        options={{
          title: 'Edit Profile',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
