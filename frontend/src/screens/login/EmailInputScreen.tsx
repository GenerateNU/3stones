import React, { useContext, useState } from 'react';
import { Image, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBar from '../../components/ProgressBar';
import { SignupContext } from '../../context/SignupContext';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function EmailInputScreen({ navigation }) {
  const { formData, updateForm } = useContext(SignupContext);
  const [email, setEmail] = useState(formData.email);

  const handleNext = () => {
    updateForm('email', email);
    navigation.navigate('PasswordInputScreen'); 
  };

  return (
    <StyledKeyboardAvoidingView
      className = 'flex-1'
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
            <StyledText className="text-center text-2xl font-bold text-black mb-2">Let's start with your email</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              You’ll use this email to log in next time.
            </StyledText>

            {/* <TextInputComponent
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              isPassword={false}
            /> */}
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <ButtonComponent
              title="Continue"
              theme="primary"
              onPress={() => {handleNext()}}
              disabled={!email.trim()} // Disable if no email
            />
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
