import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import { LoginContext } from '../../context/LoginContext';
import ProgressBarComponent from '../../components/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import WelcomeToThreeStones from './WelcomeToThreeStones';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginPasswordScreen({ navigation }) {
  const { loginData, updateLoginData } = useContext(LoginContext);
  const [password, setPassword] = useState(loginData.password);

  const handleNext = () => {
    updateLoginData('password', password);
    navigation.navigate('homeScreen');
  };

  const handleEditEmail = () => {
    navigation.navigate('LoginEmailScreen'); // Navigate back to email screen
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white p-6 justify-between">
          
          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBarComponent 
              current={2}
              total={6}
            />
          </StyledView>

          {/* Welcome Text */}
          <WelcomeToThreeStones />

          {/* Email Display with Edit Icon */}
          <StyledView className="flex-row items-center mt-6 bg-gray-100 px-4 py-2 rounded-full border border-gray-300">
            <StyledText className="text-gray-700">{loginData.email}</StyledText>
            <StyledTouchableOpacity onPress={handleEditEmail} className="ml-2">
              <Ionicons name="pencil" size={16} color="gray" />
            </StyledTouchableOpacity>
          </StyledView>

          {/* Password Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center mt-10">
            <TextInputComponent
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
            />
          </StyledView>

          {/* Forgot Login Link */}
          <TouchableOpacity>
            <StyledText className="text-teal-600 mb-4">Forgot Login?</StyledText>
          </TouchableOpacity>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <ButtonComponent
              title="Next"
              theme="primary"
              onPress={handleNext}
              disabled={!password.trim()}
            />
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
