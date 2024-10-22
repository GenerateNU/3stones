import React from 'react';
import { View, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { ArrowLeftIcon, XMarkIcon } from 'react-native-heroicons/outline'; // Use any icon library

const StyledView = styled(View);
const StyledPressable = styled(Pressable);

const ProgressBarComponent = ({ currentStep, totalSteps, showBack, showClose, onPress }) => {
  // Calculate the progress as a percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <StyledView className="flex-row items-center justify-center my-4">
      {/* Back or Close Button */}
      {showBack && (
        <StyledPressable
          className="mr-4" // Margin to the right of the button
          onPress={onPress}
        >
          <ArrowLeftIcon style={{ width: 24, height: 24}} />
        </StyledPressable>
      )}
      {showClose && (
        <StyledPressable
          className="mr-4" // Margin to the right of the button
          onPress={onPress}
        >
          <XMarkIcon style={{ width: 24, height: 24}} />
        </StyledPressable>
      )}

      {/* Progress Bar Container */}
      <StyledView className="w-11/12 h-2 bg-gray-200 rounded-full relative">
        {/* Progress Bar (filled part) */}
        <StyledView
          className="h-full bg-defaultPrimary rounded-full"
          style={{ width: `${progressPercentage}%` }} // Dynamic width based on progress
        />
      </StyledView>
    </StyledView>
  );
};

export default ProgressBarComponent;
