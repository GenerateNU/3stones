import React, { useState } from 'react';
import { Image, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import TextInputComponent from '../../components/TextInputComponent';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function EmailInputScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // Adjust based on your design
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-center">
          {/* Progress Bar */}
          <ProgressBarComponent 
            currentStep={1} 
            totalSteps={6} 
            showBack={false} 
            showClose={true} 
            onPress={() => navigation.navigate('WelcomeScreen')} 
          />
          
          <StyledText className="text-center text-2xl font-bold text-black mb-2">Let's start with your email</StyledText>
          <StyledText className="text-center text-gray-600 mb-8">
            You’ll use this email to log in next time.
          </StyledText>

          <TextInputComponent
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            isPassword={false}
          />

          <ButtonComponent
            title="Continue"
            theme="primary"
            onPress={() => navigation.navigate('PasswordInputScreen')}
            disabled={!email.trim()} // Disable if no email
          />
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
