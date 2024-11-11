import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBar';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function ConnectAccountsScreen({ navigation }) {
  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 justify-center items-center bg-surfaceBG p-6">

          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBarComponent
            current={2}
            total={6}
            />
          </StyledView>

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
            <ButtonComponent
              title="Continue"
              theme="primary"
              onPress={() => navigation.navigate('InvestmentPlanScreen')}
              disabled={false}
            />
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
