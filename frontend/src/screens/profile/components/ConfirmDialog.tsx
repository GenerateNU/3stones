import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

function ConfirmDialog({ visible, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <StyledView
        className='flex-1 justify-center items-center'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Black with 50% opacity
      >
        <StyledView
          className='bg-white p-4 flex-col items-start gap-4 self-stretch rounded-lg border border-gray-300 mx-6'
          style={{
            shadowColor: 'rgba(100, 116, 139, 0.1)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 30,
            elevation: 5, // For Android shadow
          }}
        >
          <StyledText className='text-base font-medium text-black'>
            Are you sure you want to proceed?
          </StyledText>
          <StyledView className='flex-row gap-4 self-end'>
            <StyledPressable className='px-4 py-2 bg-gray-200 rounded' onPress={onCancel}>
              <StyledText className='text-black'>Cancel</StyledText>
            </StyledPressable>
            <StyledPressable className='px-4 py-2 bg-blue-500 rounded' onPress={onConfirm}>
              <StyledText className='text-white'>Confirm</StyledText>
            </StyledPressable>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}

export default ConfirmDialog;
