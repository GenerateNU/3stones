<<<<<<< HEAD
import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function ConnectAccountsScreen({ navigation }) {
  return (
    <StyledKeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className='flex-1' contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className='flex-1 justify-center items-center bg-surfaceBG p-6'>
          {/* Progress Bar */}
          <StyledView className='w-full mb-4'>
            <ProgressBar current={4} total={6} />
          </StyledView>

          {/* Connect Accounts Section */}
          <StyledView className='w-full flex-1 justify-center items-center'>
            <StyledText className='text-3xl font-bold text-black mb-2'>Connect Accounts</StyledText>
            <StyledText className='text-center text-gray-600 mb-8'>
              Connect your bank accounts to proceed. (Plaid integration coming soon)
            </StyledText>

            {/* Placeholder for Plaid integration */}
            <StyledText className='text-center text-gray-500 mb-8'>
              [Plaid Integration Here]
            </StyledText>
          </StyledView>

          {/* Continue Button */}
          <StyledView className='w-full mt-6'>
            <Button
              type='primary'
              onPress={() => navigation.navigate('LegalInformationScreen')}
              disabled={false}
            >
              Continue
            </Button>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
=======
import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';;
import PlaidLink from '../../../expo-plaid-link/Index';
import { useLink } from '../../../services/plaid';
import TextField from '../../../components/TextField';
import TextInputComponent from '../components/TextInputComponent';
import { BodyBoldText, BodyText, CaptionText } from '../../../components/Typography';
import Button from '../../../components/Button';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function ConnectAccountsScreen({ navigation }) {
  const [search, setSearch] = useState("")

  const banks = [
    {
      name: "Chase",
      url: "www.chase.com",
      image: "https://pbs.twimg.com/profile_images/748885874516094980/ywt_aKRx_400x400.jpg"
    },
    {
      name: "Bank of America",
      url: "www.bankofamerica.com", 
      image: "https://i.pinimg.com/736x/2f/9b/19/2f9b195ba9069a509b41552b763f8c8c.jpg"
    },
    {
      name: "Wells Fargo",
      url: "www.wellsfargo.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/480px-Wells_Fargo_Bank.svg.png"
    },
    {
      name: "Citibank",
      url: "www.citi.com",
      image: "https://cdn-icons-png.flaticon.com/512/217/217437.png"
    },
    {
      name: "Capital One",
      url: "www.capitalone.com",
      image: "https://www.miamiherald.com/banks/wp-content/uploads/2024/01/Capital-One-Logo-256X256.png"
    },
    {
      name: "US Bank",
      url: "www.usbank.com",
      image: "https://play-lh.googleusercontent.com/R0odPLUnFbG0n0MLUTrE_Xbn8b-O7D40RtFG5KlTta4ARrhAtvBgHpblHNGXS8tfhtH5"
    },
    {
      name: "PNC Bank",
      url: "www.pnc.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTmbI9-Wufh2BjIblPRLGyqMgu8i5JFp_gmQ&s"
    },
    {
      name: "TD Bank",
      url: "www.td.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Toronto-Dominion_Bank_logo.svg/536px-Toronto-Dominion_Bank_logo.svg.png"
    },
    {
      name: "Truist Bank",
      url: "www.truist.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGhMKO8KWYic9nU8eiN1qGCZDUaWzL8oCbw&s"
    },
    {
      name: "Ally Bank",
      url: "www.ally.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8djhJrBss78LRfjf58vjmVojjwF_VKc141g&s"
    }
  ]

  return (
    <OnboardingScreenWrapper>
        <NavProgressBar currentStep={4} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />


        {/* Connect Accounts Section */}
        <StyledView className="w-full flex flex-col items-center mt-12">
          <StyledText className="text-2xl font-bold font-title text-defaultText mb-4">Connect your accounts</StyledText>
          <TextInputComponent placeholder="Search Institutions" value={search} onChangeText={(text) => { setSearch(text)}} />
        </StyledView>

        <StyledView className="w-full flex flex-row items-start">
          <BodyBoldText className='mt-8'>Most popular accounts</BodyBoldText>
        </StyledView>
        
        <StyledScrollView 
            className="w-full mt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              
            }}
          >
            {banks.filter((val, ind, arr) => {
              if (search.length <= 2) {
                return true;
              } else {
                return val.name.toUpperCase().includes(search.toUpperCase()) || val.url.toUpperCase().includes(search.toUpperCase())
              }
            }).map((bank, index) => (
              <StyledTouchableOpacity 
                key={index}
                className="flex-row items-center py-4"
                onPress={() => {
                  navigation.navigate("LegalInformationScreen")
                }}
              >
                <StyledImage 
                  source={{ uri: bank.image }}
                  className='w-12 h-12 rounded-full'
                />
                <StyledView className="ml-4 flex flex-col">
                  <BodyBoldText>{bank.name}</BodyBoldText>
                  <BodyText>{bank.url}</BodyText>
                </StyledView>
                <StyledImage source={require('../../../../assets/images/chevron-right.png')} className="w-6 h-6 ml-auto" style={{ tintColor: "#2b2b2b"}} />
              </StyledTouchableOpacity>
            ))}
          </StyledScrollView>

        <Button type="secondary" className="w-full" onPress={() => { navigation.navigate("LegalInformationScreen") }}>Save for later</Button>
    </OnboardingScreenWrapper>
  );
}
>>>>>>> ba39f0afdab60df11411592f36e525566e7a417b
