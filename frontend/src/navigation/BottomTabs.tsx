import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SecondScreen from '../screens/secondScreen/secondScreen';
import StackNavigator from './StackNavigator';
import WelcomeScreen from '../screens/login_flow/WelcomeScreen';

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
        name='Stack'
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='circle' />
          ),
          tabBarLabel: 'Home',
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='secondScreen'
        component={SecondScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='square' />
          ),
          tabBarLabel: 'Second screen',
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='welcomeScreen'
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon color={focused ? 'blue' : 'black'} name='square' />
          ),
          tabBarLabel: 'Signup Flow',
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
