import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

// RadioButton component
const RadioButtonComponent = ({ label, selected, onPress }) => (
  <StyledTouchableOpacity
    onPress={onPress}
    className={`flex-row items-center justify-between mb-4 p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md ${selected ? 'bg-primary/10 border-primary' : 'bg-white border-gray-300'}`}
  >
    <StyledText className={`text-lg font-medium ${selected ? 'text-primary' : 'text-black'}`}>{label}</StyledText>
    <StyledView className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-primary bg-defaultPrimary' : 'border-gray-400'}`}>
      {selected && <StyledView className="h-3 w-3 rounded-full bg-white" />}
    </StyledView>
  </StyledTouchableOpacity>
);

export default RadioButtonComponent;
