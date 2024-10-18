import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/home';
import SecondScreen from '../screens/secondScreen/secondScreen';
import ProjectScreen from '../screens/project';
import ProjectInvestScreen from '../screens/project/invest';
import ProjectUpdatesScreen from '../screens/project/updates';
import ProjectImagesScreen from '../screens/project/images';
import ProjectMapScreen from '../screens/project/map';

const Stack = createNativeStackNavigator();

export default function ProjectNavigator() {
  return (
    <Stack.Navigator initialRouteName='project'>
      <Stack.Screen
        name='project'
        component={ProjectScreen}
        options={{ title: 'Project details', headerShown: true }}
      />
      <Stack.Screen
        name='project-invest'
        component={ProjectInvestScreen}
        options={{ title: 'Invest', headerShown: true }}
      />
      <Stack.Screen
        name='project-updates'
        component={ProjectUpdatesScreen}
        options={{ title: 'Project updates', headerShown: true }}
      />
      <Stack.Screen
        name='project-images'
        component={ProjectImagesScreen}
        options={{ title: 'Project images', headerShown: true }}
      />
      <Stack.Screen
        name='project-map'
        component={ProjectMapScreen}
        options={{ title: 'Project location', headerShown: true }}        
      />
    </Stack.Navigator>
  );
}
