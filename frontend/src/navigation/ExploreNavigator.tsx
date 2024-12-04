import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from '../screens/explore/components/Search';
import ProjectUpdatesScreen from '../screens/project/ProjectUpdatesScreen';
import ExploreScreen from '../screens/explore/explore';
import SearchResults from '../screens/explore/components/SearchResults';


const Stack = createNativeStackNavigator();

export default function ExploreNavigator() {
  return (
    <Stack.Navigator initialRouteName='explore'>
      <Stack.Screen
        name='explore'
        component={ExploreScreen}
        options={{ title: 'Explore', headerShown: true }}
      />
      <Stack.Screen
        name='search'
        component={SearchScreen}
        options={{ title: 'Search', headerShown: false }}
      />
      <Stack.Screen
        name='search-results'
        component={SearchResults}

        options={{ title: 'Search Results', headerShown: true }}
      />
    </Stack.Navigator>
  );
}
