import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const ProgressBarContainer = styled(View, 'w-full h-2 bg-border rounded-full overflow-hidden mb-2');
const ProgressBarFill = styled(View, 'h-full bg-defaultPrimary rounded-full');

const ProgressBarComponent = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarFill style={{ width: `${percentage}%` }} />
    </ProgressBarContainer>
  );
};

export default ProgressBarComponent;
