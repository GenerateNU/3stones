import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import { useAuth } from '../../../context/AuthContext';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';
import { HeadingText, TitleText } from '../../../components/Typography';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function EmailInputScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth();
  const [email, setEmail] = useState(signupData.email);

  const handleNext = () => {
    updateSignupData('email', email);
    navigation.navigate('PasswordInputScreen');
  };

  return (
    <OnboardingScreenWrapper>
      {/* Progress Bar */}
      <NavProgressBar currentStep={1} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />

      {/* Email Input Section */}
      <StyledView className="w-full flex-1 justify-center items-center">
        <StyledText className="text-2xl font-bold font-title text-defaultText mb-2">Let's start with your email</StyledText>
        <StyledText className="text-center font-sourceSans3 text-defaultText mb-8">
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

    </OnboardingScreenWrapper>
  );
}
