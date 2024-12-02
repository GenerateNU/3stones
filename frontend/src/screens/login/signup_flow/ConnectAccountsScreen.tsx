import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';;
import PlaidLink from '../../../expo-plaid-link/Index';
import { useLink } from '../../../services/plaid';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function ConnectAccountsScreen({ navigation }) {
  const { linkToken, isLoading: isLinkTokenLoading } = useLink();

  useEffect(() => {
    console.log(`linkToken: ${linkToken}`)
  })

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 justify-center items-center bg-surfaceBG p-6">

          {/* Progress Bar */}
          <StyledView className="w-full mb-8">
            <ProgressBar
              current={4}
              total={6}
            />
          </StyledView>

          {/* Connect Accounts Section */}
          <StyledView className="w-full flex items-center">
            <StyledText className="text-3xl font-bold text-black mb-2">Connect Accounts</StyledText>
            <StyledText className="text-center text-gray-600">
              Connect your bank accounts to proceed.
            </StyledText>
          </StyledView>

          {/* Plaid webview */}
          {linkToken ? 
              <StyledView className="w-full flex-1">
                <PlaidLink 
                  linkToken={linkToken}
                  onEvent={(event) => console.log(event)}
                  onExit={(exit) => console.log(exit)}
                  onSuccess={(success) => {
                    console.log("SUCCESS!!!!!!!!")
                    console.log(success)
                  }}/>
              </StyledView> : <></>}
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
