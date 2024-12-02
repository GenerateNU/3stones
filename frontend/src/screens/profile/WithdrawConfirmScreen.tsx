// WithdrawConfirmScreen.js
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import Tag from '../../components/Tag';

// Reusable Ellipse Component
const Ellipse = styled(View);

const StyledView = styled(View);
const StyledText = styled(Text);

export default function WithdrawConfirmScreen() {
  const numberOfEllipses = 15;
  const ellipsesArray = Array.from({ length: numberOfEllipses });
  const ellipseWidth = 18;
  const ellipseHeight = 19.885;

  const horizontalPadding = 24;
  const availableWidth = Dimensions.get('window').width - 2 * horizontalPadding;
  const totalEllipsesWidth = ellipseWidth * numberOfEllipses;
  const adjustment = 2;
  const spacing = (availableWidth - totalEllipsesWidth - adjustment) / (numberOfEllipses - 1);

  return (
    <StyledView className='flex-1 bg-gray-50 relative'>
      {/* Top Section */}
      <StyledView className='mb-6 py-8 px-6'>
        <StyledText className='text-base font-sourceSans3 text-defaultText leading-5 mb-1'>
          Total Cash Available
        </StyledText>

        {/* Row for Balance and Button */}
        <StyledView className='flex-row justify-between items-center'>
          <StyledText className='text-3xl text-defaultText font-title leading-10'>
            $1,234.67
          </StyledText>
          <Button
            type='secondary'
            size='small'
            onPress={() => console.log('View Portfolio button pressed')}
          >
            <StyledText>View Portfolio</StyledText>
          </Button>
        </StyledView>
      </StyledView>

      {/* White Card */}
      <StyledView className='bg-white rounded-t-2xl mx-6 px-7 py-8 pb-10'>
        {/* The 'pb-10' adds padding at the bottom to accommodate the perforated ellipses */}
        <StyledView>
          <StyledText className='text-2xl font-heading font-bold text-defaultText mb-2'>
            Pending transfer
          </StyledText>
          <StyledText className='font-nunitoRegular text-base'>
            You successfully withdrew $200 out of your 3 Stones account.
          </StyledText>
          <StyledView className='py-6'>
            {/* Transaction Details */}
            <StyledView className='flex-row justify-between items-center mb-2'>
              <StyledText className='font-sourceSans3Bold text-base'>Transaction ID</StyledText>
              <StyledText className='font-sourceSans3 text-gray-900'>
                4394 3489 3984 2938
              </StyledText>
            </StyledView>
            <StyledView className='flex-row justify-between items-center mb-2'>
              <StyledText className='font-sourceSans3Bold text-base'>Date</StyledText>
              <StyledText className='font-sourceSans3 text-gray-900'>September 1, 2024</StyledText>
            </StyledView>
            <StyledView className='flex-row justify-between items-center mb-2'>
              <StyledText className='font-sourceSans3Bold text-base'>Nominal</StyledText>
              <StyledText className='font-sourceSans3 text-gray-900'>$200.00</StyledText>
            </StyledView>
            <StyledView className='flex-row justify-between items-center mb-2'>
              <StyledText className='font-sourceSans3Bold text-base'>Administrative Fee</StyledText>
              <StyledText className='font-sourceSans3 text-gray-900'>$0.25</StyledText>
            </StyledView>
            <StyledView className='flex-row justify-between items-center'>
              <StyledText className='font-sourceSans3Bold text-base'>Status</StyledText>
              <Tag level='success' className='flex-row items-center'>
                <StyledText className='font-sourceSans3'>Success</StyledText>
              </Tag>
            </StyledView>

            {/* Total */}
            <StyledView className='flex-row justify-between pt-6'>
              <StyledText className='font-heading text-lg'>Total</StyledText>
              <StyledText className='font-heading text-lg'>$199.75</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Perforated Bottom */}
      <StyledView
        className='flex-row'
        style={{
          bottom: -ellipseHeight / 2,
          left: horizontalPadding,
          right: horizontalPadding,
          height: ellipseHeight,
        }}
      >
        {ellipsesArray.map((_, index) => (
          <Ellipse
            key={index}
            className='bg-gray-50 rounded-full'
            style={{
              width: ellipseWidth,
              height: ellipseHeight,
              marginTop: -ellipseHeight,
              marginRight: index !== numberOfEllipses - 1 ? spacing : 0,
            }}
          />
        ))}
      </StyledView>
    </StyledView>
  );
}
