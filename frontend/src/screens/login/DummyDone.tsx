import React from 'react';
import {View, Text } from 'react-native';
import { styled } from 'nativewind';
import WelcomeToThreeStonesComponent from './components/WelcomeToThreeStones';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function DummyDone({ navigation }) {
  return (
    <StyledView className="flex-1 justify-center items-center bg-surfaceBG p-6">
      <WelcomeToThreeStonesComponent />

      <StyledText className="text-center text-gray-900 mb-8">
        You're logged in/signed in! This page is just until we hook up the actual login/signup flow.
      </StyledText>
    </StyledView>
  );
}
