import React, {useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';
import TextInputComponent from '../components/TextInputComponent';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';

const StyledView = styled(View);
const StyledText = styled(Text);

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
    <OnboardingScreenWrapper>

          <NavProgressBar currentStep={3} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />

          {/* User Details Input Section */}
          <StyledView className='w-full flex-1 justify-center items-center'>
            <StyledText className='text-center text-2xl font-bold text-black mb-2'>
              A bit about you
            </StyledText>
            <StyledText className='text-center text-gray-600 mb-8'>
              We need your first and last name to get started.
            </StyledText>

            <TextInputComponent
              placeholder='First Name'
              value={firstName}
              onChangeText={(input) => setFirstName(input)}
              autoCapitalize='words'
              autoFocus={true}
            ></TextInputComponent>

            <TextInputComponent
              placeholder='Last Name'
              value={lastName}
              onChangeText={(input) => setLastName(input)}
              autoCapitalize='words'
              autoFocus={false}
            ></TextInputComponent>
          </StyledView>

          {/* Continue Button */}
          <StyledView className='w-full mt-6'>
            <Button
              type='primary'
              onPress={() => {
                handleNext();
              }}
              disabled={!firstName.trim() || !lastName.trim()}
            >
              Continue
            </Button>
          </StyledView>

        </OnboardingScreenWrapper>
  );
}
