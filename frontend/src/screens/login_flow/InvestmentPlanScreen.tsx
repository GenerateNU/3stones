import React from 'react';
import { Image, View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import TextInputComponent from '../../components/TextInputComponent';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function InvestmentPlanScreen({ navigation }) {
    return (
        <StyledView className="flex-1 items-center bg-surfaceBG p-6">
            <ProgressBarComponent 
            currentStep={5} 
            totalSteps={6} 
            showBack={true} 
            showClose={false} 
            onPress={() => navigation.navigate('ConnectAccountsScreen')} />
          <StyledText className="text-center text-2xl font-bold text-black mb-2">Last but not least!</StyledText>
          <StyledText className="text-center text-gray-600 mb-8">
          Take a second to answer questions to better understand you as an investor.
          </StyledText>
    
      <ButtonComponent
        title="Sign Up"
        theme="primary"
        onPress={() => navigation.navigate('homeScreen')} // Replace with your actual navigation route
        disabled={false}
      />
    </StyledView>
  );
}
