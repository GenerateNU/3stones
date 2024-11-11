import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import { LoginContext } from '../../context/LoginContext';
import WelcomeToThreeStones from './WelcomeToThreeStones';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginEmailScreen({ navigation }) {
  const { loginData, updateLoginData } = useContext(LoginContext);

  const handleNext = () => {
    navigation.navigate('LoginPasswordScreen');
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white p-6 justify-between">
          
          {/* Header */}
          <WelcomeToThreeStones />

          {/* Email Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center mt-10">
            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="Email"
              value={loginData.email}
              onChangeText={(text) => updateLoginData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* OR Separator */}
            <StyledView className="w-full flex-row items-center my-4">
              <StyledView className="flex-1 h-px bg-gray-300" />
              <StyledText className="px-4 text-gray-500">OR</StyledText>
              <StyledView className="flex-1 h-px bg-gray-300" />
            </StyledView>

            {/* Google and Apple Sign-In Buttons (Stub) */}
            <StyledTouchableOpacity className="w-11/12 h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
              <StyledText className="text-gray-500">Sign in with Google</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="w-11/12 h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
              <StyledText className="text-gray-500">Sign in with Apple</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Forgot Login and Next Button */}
          <StyledView className="w-full items-center">
            <TouchableOpacity>
              <StyledText className="text-gray-500 mb-4">Forgot Login?</StyledText>
            </TouchableOpacity>
            <ButtonComponent
              title="Next"
              theme="primary"
              onPress={handleNext}
              disabled={!loginData.email.trim()} // Disable if no email
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
