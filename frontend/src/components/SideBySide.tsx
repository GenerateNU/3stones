import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SideBySide = ({ leftComponent, rightComponent, spacing = 'mr-2', containerStyle = '' }) => {
  return (
    <StyledView className={`flex flex-row items-center justify-between ${containerStyle}`}>
      <StyledView className={`flex-1 ${spacing}`}>
        {leftComponent}
      </StyledView>
      <StyledView className="flex-shrink-0">
        {rightComponent}
      </StyledView>
    </StyledView>
  );
};

export default SideBySide;