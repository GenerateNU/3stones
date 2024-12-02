import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import ConfirmDialog from './components/ConfirmDialog'; // Adjust the import path if necessary

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function TransactionScreen({ route, navigation }) {
  const { withdraw } = route.params; // Get the withdraw variable
  const [inputValue, setInputValue] = useState('');
  const [isValidInput, setIsValidInput] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleInputChange = (text) => {
    setInputValue(text);

    // Validate the input
    const regex = /^\d+(\.\d{1,2})?$/;
    const amount = Number(text);

    if (regex.test(text) && !isNaN(amount) && amount > 0) {
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  };

  const handleTransactionPress = () => {
    setConfirmVisible(true);
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    navigation.navigate(withdraw ? 'profile-withdraw-confirm' : 'profile-deposit-confirm');
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  const buttonBgColor = isValidInput ? 'bg-defaultPrimary' : 'bg-gray-300';

  return (
    <StyledView className='flex-1 bg-white p-4'>
      <StyledView className='py-8 px-6'>
        <StyledView className='bg-brand-400 rounded-2xl w-full gap-y-[10px]'>
          <StyledView className='bg-brand-400 rounded-lg p-[4vw] flex-col w-full'>
            <StyledView className='flex-row justify-between items-center mb-4'>
              <StyledText className='text-inverseText font-sourceSans3Bold'>
                Available Balance
              </StyledText>
              <Button
                type='primary'
                size='small'
                className='rounded-[50px] bg-defaultPrimary'
                onPress={() => console.log('View Portfolio button pressed')}
              >
                View Portfolio
              </Button>
            </StyledView>

            <StyledText className='text-[32px] text-inverseText font-title mb-2'>
              $700.00
            </StyledText>

            <StyledText className='font-sourceSans3 text-inverseText'>
              Total Available Cash
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView className='pt-6 -m-4'>
          <TextField
            intent='default'
            size='large'
            icon='suffix'
            placeholder={`Enter Amount to ${withdraw ? 'Withdraw' : 'Deposit'}`}
            prefix='$'
            suffix='USD'
            onChangeText={handleInputChange}
            value={inputValue}
          />
        </StyledView>
      </StyledView>

      <StyledView className='flex flex-col justify-end items-start flex-grow py-4 px-6 gap-4'>
        <StyledText className='font-sourceSans3'>
          {withdraw ? 'Transferring to' : 'Transferring from'}
        </StyledText>
        <StyledView className='flex-row items-center justify-between w-full'>
          <StyledView className='flex-row items-center'>
            <StyledImage source={require('../../../assets/images/chase.png')} className='w-8 h-8' />
            <StyledView className='flex-row px-2 py-1 items-center'>
              <StyledText className='font-sourceSans3Bold pr-2'>Chase Bank</StyledText>
              <StyledText className='font-sourceSans3'>xxxx2731</StyledText>
            </StyledView>
          </StyledView>
          <StyledImage
            source={require('../../../assets/images/edit-icon-dark.png')}
            className='w-8 h-8 ml-4'
          />
        </StyledView>
        <StyledText className='font-sourceSans3 font-normal text-xs text-gray-800 leading-4'>
          Transfer speed depends on your bank and could take up to 30 minutes. Transfers are
          reviewed which may result in delays or funds being frozen or removed from your account.
        </StyledText>
        <StyledView className='w-full'>
          <Button
            type='primary'
            size='large'
            className={`w-full rounded-[50px] ${buttonBgColor} ${
              isValidInput ? '' : 'bg-gray-300'
            }`}
            onPress={handleTransactionPress}
            disabled={!isValidInput}
          >
            {withdraw ? 'Withdraw' : 'Deposit'}
          </Button>
        </StyledView>
      </StyledView>

      {/* Confirm Dialog */}
      <ConfirmDialog
        visible={confirmVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        withdraw={withdraw}
      />
    </StyledView>
  );
}
