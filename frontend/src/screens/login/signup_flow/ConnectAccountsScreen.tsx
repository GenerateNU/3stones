import React from 'react';
import { View, Text} from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ConnectAccountsScreen({ navigation }) {
  return (
    <OnboardingScreenWrapper>
      {/* Progress Bar */}
      <NavProgressBar currentStep={4} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />


      {/* Connect Accounts Section */}
      <StyledView className="w-full flex-1 justify-center items-center">
        <StyledText className="text-3xl font-bold text-black mb-2">Connect Accounts</StyledText>
        <StyledText className="text-center text-gray-600 mb-8">
          Connect your bank accounts to proceed. (Plaid integration coming soon)
        </StyledText>

        {/* Placeholder for Plaid integration */}
        <StyledText className="text-center text-gray-500 mb-8">
          [Plaid Integration Here]
        </StyledText>
      </StyledView>

      {/* Continue Button */}
      <StyledView className="w-full mt-6">
        <Button
          type="primary"
          onPress={() => navigation.navigate('LegalInformationScreen')}
          disabled={false}
        >Continue</Button>
      </StyledView>

    </OnboardingScreenWrapper>
  );
}
