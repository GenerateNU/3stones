import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import NotificationButton from './components/NotificationButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function WithdrawScreen({ navigation }) {
  return (
    <StyledView className='flex-1 bg-surfaceBG px-[4vw] py-[6vh]'>
      {/* Balance Info */}
      <StyledView className='bg-white rounded-lg p-[5vw] mb-[10px] w-full gap-y-[10px]'>
        <StyledImage
          className='w-8 h-8 mx-auto'
          source={require('../../../assets/images/withdraw-error.png')}
          alt='Withdraw Error'
        />
        <StyledText className='font-nunito-sans text-gray-600 text-lg not-italic font-bold leading-6'>
          Please verify before proceeding:
        </StyledText>
        <StyledText className='text-base font-sourceSans3 text-gray-500 leading-[22px] mb-[10px]'>
          You can withdraw your full balance or leave a small amount in your account.
        </StyledText>

        {/* Brand Section */}
        <StyledView className='bg-brand-400 rounded-lg p-[4vw] flex-col w-full'>
          {/* Row with "Available Balance" and the Edit Icon */}
          <StyledView className='flex-row justify-between items-center mb-4'>
            <StyledText className='text-inverseText font-sourceSans3 font-bold text-[16px] leading-[22px]'>
              Available Balance
            </StyledText>
            <StyledImage
              className='w-[6vw] h-[6vw]'
              source={require('../../../assets/images/edit-icon-light.png')}
              alt='Edit Balance'
            />
          </StyledView>

          {/* "$700.00" Text */}
          <StyledText className='text-[32px] text-inverseText font-nunito-sans font-extrabold leading-[40px] mb-2'>
            $700.00
          </StyledText>

          {/* "Total Available Cash" Text */}
          <StyledText className='font-sourceSans3 text-inverseText font-medium text-[12px] leading-[14px]'>
            Total Available Cash
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Connected Bank Section */}
      <StyledView className='rounded-[16px] bg-surfaceBG border border-borderPrimary p-[5vw] w-full mt-[10px]'>
        {/* Connected Bank Header */}
        <StyledView className='flex flex-row justify-between items-center mb-4'>
          <StyledText className='text-lg font-sourceSans3 text-defaultText'>
            Connected Bank
          </StyledText>
          <StyledImage
            className='w-8 h-8 hover:opacity-75 cursor-pointer'
            source={require('../../../assets/images/edit-icon-dark.png')}
            alt='Edit Connected Bank'
          />
        </StyledView>

        {/* Chase Bank Information */}
        <StyledView className='flex flex-row items-center'>
          <StyledImage
            className='w-8 h-8 mr-4'
            source={require('../../../assets/images/chase.png')}
            alt='Chase Bank Logo'
          />
          <StyledView className='flex flex-col'>
            <StyledText className='text-base font-sourceSans3 font-bold text-defaultText'>
              Chase Bank
            </StyledText>
            <StyledText className='text-sm font-sourceSans3 font-medium text-defaultText'>
              XXXXXX
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Spacer View to Push Button to Bottom */}
      <StyledView className='flex-grow'></StyledView>

      {/* Withdraw Button */}
      <StyledView className='w-full'>
        <Button
          type='primary'
          size='large'
          className='w-full rounded-[50px] bg-defaultPrimary'
          onPress={() => console.log('Withdraw button pressed')}
        >
          Withdraw
        </Button>
      </StyledView>
    </StyledView>
  );
}
