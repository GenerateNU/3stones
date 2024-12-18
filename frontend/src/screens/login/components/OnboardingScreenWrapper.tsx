import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { styled } from 'nativewind';

// Styled components
const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

interface OnboardingScreenWrapperProps {
  children: React.ReactNode;
  keyboardVerticalOffset?: number; // Customizable keyboard offset
}

const OnboardingScreenWrapper: React.FC<OnboardingScreenWrapperProps> = ({
  children,
  keyboardVerticalOffset = 60, // Default keyboard offset
}) => {
  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledKeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <StyledScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <StyledView className="flex-1 items-center bg-white p-6 justify-between">
              {children}
            </StyledView>
          </StyledScrollView>
        </StyledKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </StyledSafeAreaView>
  );
};

export default OnboardingScreenWrapper;
