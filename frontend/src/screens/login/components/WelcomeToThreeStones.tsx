import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function WelcomeToThreeStonesComponent() {
  return (
    <StyledView className="items-center mt-20 py-5">
      <StyledText className="text-xl text-gray-900 font-heading">Welcome to</StyledText>
      <StyledText className="text-5xl font-title text-gray-900 leading-[56px] px-2">3 Stones</StyledText>
    </StyledView>
  );
}