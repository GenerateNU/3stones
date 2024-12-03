import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileLegalDocumentsScreen from '../screens/profile/ProfileLegalDocumentsScreen';
import ProfileSettingsScreen from '../screens/profile/ProfileSettingsScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName='profile'>
      <Stack.Screen
        name='profile'
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false}}
      />
      <Stack.Screen
        name='profile-legal-documents'
        component={ProfileLegalDocumentsScreen}
        options={
          {
            title: "Legal Documents", 
            headerShown: false,
          }
        }
      />
      <Stack.Screen
        name='profile-settings'
        component={ProfileSettingsScreen}
        options={
          {
            title: "Settings", 
            headerShown: false,
          }
        }
      />
      <Stack.Screen
        name='profile-edit'
        component={ProfileEditScreen}
        options={
          {
            title: "Edit Profile", 
            headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
}
