import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import { useAuth } from '../../../context/AuthContext';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';


const StyledView = styled(View);
const StyledText = styled(Text);

export default function PasswordInputScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth();
  const [password, setPassword] = useState(signupData.password);

  const handleNext = () => {
    updateSignupData('password', password);
    navigation.navigate('UserDetailsScreen');
  };

  return (
    <OnboardingScreenWrapper>

      <NavProgressBar currentStep={2} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />


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

    </OnboardingScreenWrapper>
  );
}
