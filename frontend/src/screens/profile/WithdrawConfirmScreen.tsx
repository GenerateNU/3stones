// WithdrawConfirmScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import Svg, { Path } from 'react-native-svg';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function WithdrawConfirmScreen() {
  return (
    <StyledView className='flex-1 bg-gray-50'>
      {/* Top Section */}
      {/* Top Section */}
      <StyledView className='mb-6 py-8 px-6'>
        <StyledText className='text-base font-sourceSans3 font-normal text-defaultText leading-5 mb-1'>
          Total Cash Available
        </StyledText>

        {/* Row for Balance and Button */}
        <StyledView className='flex-row justify-between items-center'>
          <StyledText className='text-3xl text-defaultText font-extrabold leading-10'>
            $1,234.67
          </StyledText>
          <Button
            type='secondary'
            size='small'
            className=''
            onPress={() => console.log('View Portfolio button pressed')}
          >
            <StyledText className=''>View Portfolio</StyledText>
          </Button>
        </StyledView>
      </StyledView>

      {/* Pending Transfer Card */}
      <StyledView className='bg-white rounded-t-2xl shadow-md overflow-hidden'>
        <StyledView className='p-6'>
          <StyledText className='text-lg font-bold text-black mb-2'>Pending transfer</StyledText>
          <StyledText className='text-sm text-gray-600 mb-4'>
            You successfully withdrew $200 out of your 3 Stones account.
          </StyledText>

          {/* Transaction Details */}
          <StyledView className='flex-row justify-between mb-2'>
            <StyledText className='font-bold text-black'>Transaction ID</StyledText>
            <StyledText className='text-gray-600'>4394 3489 3984 2938</StyledText>
          </StyledView>
          <StyledView className='flex-row justify-between mb-2'>
            <StyledText className='font-bold text-black'>Date</StyledText>
            <StyledText className='text-gray-600'>September 1, 2024</StyledText>
          </StyledView>
          <StyledView className='flex-row justify-between mb-2'>
            <StyledText className='font-bold text-black'>Nominal</StyledText>
            <StyledText className='text-gray-600'>$200.00</StyledText>
          </StyledView>
          <StyledView className='flex-row justify-between mb-2'>
            <StyledText className='font-bold text-black'>Administrative Fee</StyledText>
            <StyledText className='text-gray-600'>$0.25</StyledText>
          </StyledView>
          <StyledView className='flex-row justify-between items-center mb-4'>
            <StyledText className='font-bold text-black'>Status</StyledText>
            <StyledView className='px-3 py-1 bg-green-100 rounded-full'>
              <StyledText className='text-green-700 text-sm font-medium'>Success</StyledText>
            </StyledView>
          </StyledView>

          {/* Total */}
          <StyledView className='flex-row justify-between'>
            <StyledText className='font-bold text-black text-lg'>Total</StyledText>
            <StyledText className='font-bold text-black text-lg'>$199.75</StyledText>
          </StyledView>
        </StyledView>
        {/* SVG Serrated Edge */}
      </StyledView>
    </StyledView>
  );
}
