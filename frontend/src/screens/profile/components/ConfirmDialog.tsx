import React from 'react';
import { View, Text, Modal, Image } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

function ConfirmDialog({ visible, onConfirm, onCancel, withdraw }) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <StyledView
        className='flex-1 justify-center items-center'
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        <StyledView
          className='bg-white p-4 rounded-lg shadow-lg'
          style={{
            width: 328,
            shadowColor: 'rgba(100, 116, 139, 0.10)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 30,
            borderWidth: 1,
            borderColor: '#DDD',
          }}
        >
          <StyledImage
            source={require('../../../../assets/images/withdraw-error.png')}
            className='w-8 h-8 mb-4'
          />

          <StyledText className='font-heading mb-1' style={{ width: '100%' }}>
            {withdraw ? 'Are you sure?' : 'Confirm Deposit'}
          </StyledText>

          <StyledText
            className='text-gray-900 font-sourceSans3 leading-5 mb-4'
            style={{ width: '100%' }}
          >
            {withdraw
              ? 'Withdrawing funds could impact your real estate investments and returns. Review your portfolio before continuing.'
              : "You're about to deposit funds into your real estate portfolio. Review the amount and allocation before proceeding."}
          </StyledText>

          <StyledView className='flex-row justify-between'>
            <Button
              type='secondary'
              size='medium'
              className='flex-1 rounded-full mr-2'
              onPress={onCancel}
            >
              <StyledText>Cancel</StyledText>
            </Button>

            <Button
              type='primary'
              size='medium'
              className='flex-1 rounded-full ml-2'
              onPress={onConfirm}
            >
              <StyledText>{withdraw ? 'Withdraw' : 'Deposit'}</StyledText>
            </Button>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}

export default ConfirmDialog;
