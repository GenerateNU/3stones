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

export default function PasswordInputScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth();
  const [password, setPassword] = useState(signupData.password);

  const handleNext = () => {
    updateSignupData('password', password);
    navigation.navigate('UserDetailsScreen');
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">

          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBar
              current={2}
              total={6}
            />
          </StyledView>

          {/* Password Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">Create a password</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              Choose a strong password for your account.
            </StyledText>

            <TextInputComponent
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              isPassword={true}
            >
            </TextInputComponent>
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={() => { handleNext() }}
              disabled={!password.trim()} // Disable if password is empty
            >Continue</Button>
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
