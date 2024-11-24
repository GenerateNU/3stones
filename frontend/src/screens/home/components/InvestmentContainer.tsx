import React from 'react';
import { Text, View, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const InvestmentStatus = ({ amount, status }) => {
  return (
    <StyledView className='flex flex-col flex-2 space-y-[5vh]'>
      <StyledText className='font-sourceSans3Bold text-[4.5vw] text-right'>
        ${amount.toLocaleString()}
      </StyledText>
      <StyledText className='font-sourceSans3 text-[3vw] text-success text-right'>
        {status}
      </StyledText>
    </StyledView>
  );
};

const InvestmentImageAndAddress = ({ image, street, city }) => {
  return (
    <StyledView className='flex flex-1 flex-row space-x-[17vw]'>
      <StyledImage
        source={{ uri: image }}
        className='w-[13vw] h-[13vw] bg-black rounded-full'
      ></StyledImage>
      <StyledView className='flex-col space-y-[5vh]'>
        <StyledText className='font-sourceSans3Bold text-[4.5vw]'>{street}</StyledText>
        <StyledText className='text-[3vw] font-sourceSans3'>{city}</StyledText>
      </StyledView>
    </StyledView>
  );
};

const InvestmentContainer = ({ image, street, city, amount, status }) => {
  return (
    <StyledView className='w-[full] h-[10vh] flex flex-row justify-center items-center'>

      <InvestmentImageAndAddress image={image} street={street} city={city}></InvestmentImageAndAddress>
      <InvestmentStatus amount={amount} status={status}></InvestmentStatus>

      <StyledImage
        source={require('../../../../assets/images/chevron-right-black.png')}
        className='w-[7vw] h-[7vw] ml-[5vw] flex-3'
      ></StyledImage>
    </StyledView>
  );
};

export default InvestmentContainer;
