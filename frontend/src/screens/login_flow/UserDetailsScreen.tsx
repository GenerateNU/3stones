import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import TextInputComponent from '../../components/TextInputComponent';
import { SignupContext } from '../../context/SignupContext';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function UserDetailsScreen({ navigation }) {
  const { formData, updateForm } = useContext(SignupContext);
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);

  const handleNext = () => {
    updateForm('firstName', firstName);
    updateForm('lastName', lastName);
    navigation.navigate('ConnectAccountsScreen'); 
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
            <ProgressBarComponent
              currentStep={3}
              totalSteps={6}
              showBack={true}
              showClose={false}
              onPress={() => navigation.navigate('PasswordInputScreen')}
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
              onChangeText={setFirstName}
              isPassword={false}
            />

            <TextInputComponent
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              isPassword={false}
            />
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <ButtonComponent
              title="Continue"
              theme="primary"
              onPress={() => {handleNext()}}
              disabled={!firstName.trim() || !lastName.trim()}
            />
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}