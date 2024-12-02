// ConfirmDialog.js
import React from 'react';
import { View, Text, Modal, Image } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

function ConfirmDialog({ visible, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      {/* Background Overlay */}
      <StyledView
        className='flex-1 justify-center items-center'
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        {/* Dialog Container */}
        <StyledView
          className='bg-white p-4 rounded-lg shadow-lg'
          style={{
            width: 328,
            // Box shadow and border styles
            shadowColor: 'rgba(100, 116, 139, 0.10)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 30,
            borderWidth: 1,
            borderColor: '#DDD',
          }}
        >
          {/* Dialog Image */}
          <StyledImage
            source={require('../../../../assets/images/withdraw-error.png')}
            className='w-8 h-8 mb-4'
          />

          {/* Dialog Title */}
          <StyledText
            className='text-gray-900 font-bold font-nunito-sans mb-1'
            style={{ width: '100%' }}
          >
            Are you sure?
          </StyledText>

          {/* Dialog Message */}
          <StyledText
            className='text-gray-900 font-sans font-normal leading-5 mb-4'
            style={{ width: '100%' }}
          >
            Withdrawing funds could impact your real estate investments and returns. Review your
            portfolio before continuing.
          </StyledText>

          {/* Buttons Container */}
          <StyledView className='flex-row justify-between'>
            {/* Secondary Button */}
            <Button
              type='secondary'
              size='medium'
              className='flex-1 rounded-full'
              onPress={onConfirm}
              style={{ marginRight: 8 }}
            >
              <StyledText className='text-defaultPrimary'>Withdraw</StyledText>
            </Button>

            {/* Primary Button */}
            <Button
              type='primary'
              size='medium'
              className='flex-1 rounded-full'
              onPress={onCancel}
              style={{ marginLeft: 8 }}
            >
              <StyledText className='text-white'>Cancel</StyledText>
            </Button>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}

export default ConfirmDialog;
