import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext'; // Update import path based on where AuthContext is stored
import WelcomeToThreeStonesComponent from '../components/WelcomeToThreeStones';
import TextInputComponent from '../components/TextInputComponent';
import Divider from '../../../components/Divider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginEmailScreen({ navigation }) {
  const { loginData, updateLoginData } = useAuth(); // Access loginData and updateLoginData from AuthContext

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
          <WelcomeToThreeStonesComponent />

          {/* Email Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center mt-10">
            <TextInputComponent
              placeholder="Email"
              value={loginData.email}
              onChangeText={(input) => updateLoginData('email', input)}
              isPassword={false}
              keyboardType="email-address"
            />

            {/* OR Separator */}
            <Divider text='OR' />

            {/* Google and Apple Sign-In Buttons (Stub) */}
            <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
              <StyledText className="text-gray-500">Sign in with Google</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
              <StyledText className="text-gray-500">Sign in with Apple</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Forgot Login and Next Button */}
          <StyledView className="w-full items-center">
            <Button
              type="plain-dark"
              size="small"
            >
              Forgot Login?
            </Button>
            <StyledView className="w-full">
              <Button
                type="primary"
                state={loginData.email ? 'default' : 'disabled'}
                size="medium"
                onPress={handleNext}
                disabled={!loginData.email.trim()} // Disable button if email is empty
              >
                Next
              </Button>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}