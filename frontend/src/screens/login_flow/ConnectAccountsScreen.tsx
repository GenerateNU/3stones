import React from 'react';
import { Image, View, Text } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function ConnectAccountsScreen({ navigation }) {
  return (
    <StyledView className="flex-1 justify-center items-center bg-surfaceBG p-6">
        <ProgressBarComponent 
            currentStep={4} 
            totalSteps={6} 
            showBack={true} 
            showClose={false} 
            onPress={() => navigation.navigate('UserDetailsScreen')} />
      <StyledText className="text-3xl font-bold text-black mb-2">Connect Accounts</StyledText>

      <ButtonComponent
        title="Continue"
        theme="primary"
        onPress={() => navigation.navigate('InvestmentPlanScreen')}
        disabled={false}
      />
    </StyledView>
  );
}
