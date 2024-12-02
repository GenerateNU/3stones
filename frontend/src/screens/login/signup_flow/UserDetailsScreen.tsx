import React, {useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import { useAuth } from '../../../context/AuthContext';
import TextInputComponent from '../components/TextInputComponent';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function UserDetailsScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth();
  const [firstName, setFirstName] = useState(signupData.firstName);
  const [lastName, setLastName] = useState(signupData.lastName);

  const handleNext = () => {
    updateSignupData('firstName', firstName);
    updateSignupData('lastName', lastName);
    navigation.navigate('ConnectAccountsScreen')
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
              current={3}
              total={6}
            />
          </StyledView>

          {/* User Details Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">A bit about you</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              We need your first and last name to get started.
            </StyledText>

            <TextInputComponent
              placeholder="First Name"
              value={firstName}
              onChangeText={(input) => setFirstName(input)}
              autoCapitalize='words'
              autoFocus={true}
            >
            </TextInputComponent>

            <TextInputComponent
              placeholder="Last Name"
              value={lastName}
              onChangeText={(input) => setLastName(input)}
              autoCapitalize='words'
              autoFocus={false}
            >
            </TextInputComponent>
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={() => { handleNext() }}
              disabled={!firstName.trim() || !lastName.trim()}
            >Continue</Button>
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
