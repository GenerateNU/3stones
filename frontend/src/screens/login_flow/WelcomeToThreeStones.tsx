import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function WelcomeToThreeStonesComponent() {
  return (
    <StyledView className="items-center mt-20">
      <StyledText className="text-lg text-gray-500 font-heading">Welcome to</StyledText>
      <StyledText className="text-4xl font-title text-gray-900">3 Stones</StyledText>
    </StyledView>
  );
}
