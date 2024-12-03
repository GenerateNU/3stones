import React, {useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import TextInputComponent from '../components/TextInputComponent';
import { useAuth } from '../../../context/AuthContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

export default function EmailInputScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth();
  const [email, setEmail] = useState(signupData.email);

  const handleNext = () => {
    updateSignupData('email', email);
    navigation.navigate('PasswordInputScreen');
  };

  return (
    <StyledKeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">

          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBar
              current={1}
              total={6}
            />
          </StyledView>

          {/* Email Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2 font-heading">Let's start with your email</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              You’ll use this email to log in next time.
            </StyledText>
            <TextInputComponent
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            >
            </TextInputComponent>

          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={() => { handleNext() }}
              disabled={!email.trim()} // Disable if no email
            >Continue</Button>
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
