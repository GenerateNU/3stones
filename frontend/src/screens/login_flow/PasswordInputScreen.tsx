import React from 'react';
import { Image, View, Text } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import TextInputComponent from '../../components/TextInputComponent';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function PasswordInputScreen ({ navigation }) {
  return (
    <StyledView className="flex-1 items-center bg-surfaceBG p-6">
        <ProgressBarComponent 
        currentStep={2} 
        totalSteps={6} 
        showBack={true} 
        showClose={false} 
        onPress={() => navigation.navigate('EmailInputScreen')} />
      <StyledText className="text-center text-2xl font-bold text-black mb-2">Create a password</StyledText>


      <TextInputComponent
        placeholder="Password"
        value=""
        onChangeText={() => {}}
        isPassword={true}
        ></TextInputComponent>


      <ButtonComponent
        title="Continue"
        theme="primary"
        onPress={() => navigation.navigate('UserDetailsScreen')}
        disabled={false}
      />
    </StyledView>
  );
}
