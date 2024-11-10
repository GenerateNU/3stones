import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PortfolioScreen from '../screens/portfolio/PortfolioScreen';
import ProjectNavigator from './ProjectNavigator';
import ProfileNavigator from './ProfileNavigator';
import HomeScreen from '../screens/home/home';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: { name: string; color: string }) {
  return (
    <FontAwesome5 name={props.name} size={26} style={{ marginBottom: -3 }} color={props.color} />
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='home' />
          ),
          tabBarLabel: 'Home',
          title: '',
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name='Explore'
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='search' />
          ),
          tabBarLabel: 'Explore',
          title: '',
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name='Portfolio'
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='chart-pie' />
          ),
          tabBarLabel: 'Portfolio',
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Project'
        component={ProjectNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='building' />
          ),
          tabBarLabel: 'Project',
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='user' />
          ),
          tabBarLabel: 'Profile',
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
