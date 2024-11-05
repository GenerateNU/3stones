import React from 'react';
import { Text, View, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const InvestmentContainer = ({ image, street, city, amount, status }) => {
  return (
    <StyledView className='w-full flex flex-row'>
      <StyledView className='flex flex-1 flex-row space-x-[2vw]'>
        <StyledImage source={{ uri: image }} className='w-[10vw] h-[10vw] rounded-full'></StyledImage>
        <StyledView className="flex-col">
        <StyledText>{street}</StyledText>
        <StyledText>{city}</StyledText>
        </StyledView>
      </StyledView>

      <StyledView className='flex flex-col flex-2'>
        <StyledText>{amount}</StyledText>
        <StyledText>{status}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default InvestmentContainer;