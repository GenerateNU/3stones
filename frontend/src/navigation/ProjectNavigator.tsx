import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectScreen from '../screens/project/ProjectScreen';
import ProjectInvestScreen from '../screens/project/ProjectInvestScreen';
import ProjectUpdatesScreen from '../screens/project/ProjectUpdatesScreen';
import ProjectImagesScreen from '../screens/project/ProjectImagesScreen';
import ProjectMapScreen from '../screens/project/ProjectMapScreen';
import { styled } from 'nativewind';
import ProjectInvestSuccessScreen from '../screens/project/ProjectInvestSuccessScreen';

const Stack = createNativeStackNavigator();

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

export default function ProjectNavigator() {
  return (
    <Stack.Navigator initialRouteName='project' >
      <Stack.Screen
        name='project'
        component={ProjectScreen}
        initialParams={{projectId: 'c3733692-5a86-441f-8ad0-9c32c648bb72'}}
        options={{ title: 'Project details', header: (props) => {
          return (
            <StyledSafeAreaView className="bg-surfaceBG">
              <StyledText className="font-heading text-2xl text-center p-4">Project details</StyledText>
            </StyledSafeAreaView>
          )
        } }}
      />
      <Stack.Screen
        name='project-invest'
        component={ProjectInvestScreen}
        options={{ title: 'Invest', header: (props) => {
          const canGoBack = props.navigation.canGoBack()
          return (
            <StyledSafeAreaView className="bg-surfaceBG">
                <StyledText className="font-heading text-2xl text-center p-4">Invest</StyledText>
            </StyledSafeAreaView>
          )
        }}}
      />
      <Stack.Screen
        name='project-updates'
        component={ProjectUpdatesScreen}
        options={{ title: 'Project updates', headerShown: true }}
      />
      <Stack.Screen
        name='project-images'
        component={ProjectImagesScreen}
        options={{ title: 'Project images', header: (props) => {
          return (
            <StyledSafeAreaView className="bg-surfaceBG">
              <StyledText className="font-heading text-2xl text-center p-4">Project images</StyledText>
            </StyledSafeAreaView>
          )
        } }}
      />
      <Stack.Screen
        name='project-map'
        component={ProjectMapScreen}
        options={{ title: 'Project map', header: (props) => {
          return (
            <StyledSafeAreaView className="bg-surfaceBG">
              <StyledText className="font-heading text-2xl text-center p-4">Project map</StyledText>
            </StyledSafeAreaView>
          )
        } }}
      />
      <Stack.Screen
        name='project-invest-success'
        component={ProjectInvestSuccessScreen}
        options={{ title: 'Deposit', header: (props) => {
          return (
            <StyledSafeAreaView className="bg-surfaceBG">
              <StyledText className="font-heading text-2xl text-center p-4">Deposit</StyledText>
            </StyledSafeAreaView>
          )
        } }}
      />
    </Stack.Navigator>
  );
}
