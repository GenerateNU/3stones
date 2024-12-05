import React from 'react';
import { View, Pressable, Image, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';

// Styled components
const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

// Props interface
interface NavProgressBarProps {
  currentStep?: number; // Optional
  totalSteps?: number;  // Optional
  buttonType: 'back' | 'close'; // Required
  onPress: () => void; // Required
}

const NavProgressBar: React.FC<NavProgressBarProps> = ({
  currentStep,
  totalSteps,
  buttonType,
  onPress,
}) => {
  // Determine if the progress bar should be displayed
  const showProgress = currentStep !== undefined && totalSteps !== undefined;

  console.log(`${showProgress}`)

  return (
    <SafeAreaView>
      <StyledView className="w-full flex flex-row items-center justify-between">
        {/* Left Section: Back or Close Button */}
        <StyledView className="flex-row items-center">
          {buttonType === 'back' && (
            <StyledPressable
              className="mr-4"
              onPress={onPress}
            >
              <StyledImage
                source={require('../../../../assets/images/chevron-left-round.png')}
                className="w-6 h-6"
              />
            </StyledPressable>
          )}
          {buttonType === 'close' && (
            <StyledPressable
              className="mr-4"
              onPress={onPress}
            >
              <StyledImage
                source={require('../../../../assets/images/close-outline.png')}
                className="w-6 h-6"
              />
            </StyledPressable>
          )}
        </StyledView>

        {/* Center Section: Progress Bar */}
        <StyledView className="flex-1 mt-[6px] flex flex-row items-center w-full">
          {showProgress && (
            <ProgressBar current={currentStep} total={totalSteps} />
          )}
        </StyledView>

        {/* Right Section: Spacer to Align Icons */}
        {!showProgress && <StyledView className="w-20" />}
      </StyledView>
    </SafeAreaView>
  );
};

export default NavProgressBar;
