import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import { create, open } from 'react-native-plaid-link-sdk';
import { useLink } from '../../../services/plaid';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function ConnectAccountsScreen({ navigation }) {
  const { linkToken, isLoading: isLinkTokenLoading } = useLink();
  const [isLinkReady, setIsLinkReady] = useState(false);

  // Preload Plaid when linkToken is available
  useEffect(() => {
    if (linkToken) {
      create({
        token: linkToken,
        noLoadingState: false, // Optional: shows/hides native loading indicator
      });
      setIsLinkReady(true);
    }
  }, [linkToken]);

  const openPlaid = async () => {
    try {
      const result = await open({
        onSuccess: (success) => {
          console.log('Success:', success);
          // Handle success - send public token to your server
        },
        onExit: (exit) => {
          console.log('Exit:', exit);
          // Handle user exit
        },
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

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
            <ProgressBar
              current={4}
              total={6}
            />
          </StyledView>

          {/* Connect Accounts Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-3xl font-bold text-black mb-2">Connect Accounts</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              Connect your bank accounts to proceed.
            </StyledText>

            {!isLinkTokenLoading && isLinkReady && (
              <Button
                type="primary"
                onPress={openPlaid}
              >
                Connect Bank Account
              </Button>
            )}
          </StyledView>

          {/* Continue Button
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={() => navigation.navigate('LegalInformationScreen')}
              disabled={false}
            >Continue</Button>
          </StyledView> */}

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
