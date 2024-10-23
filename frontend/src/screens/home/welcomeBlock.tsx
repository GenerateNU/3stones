import React from 'react';
import { Image, Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const NotificationIconBlock = () => {
  return (
    <StyledView className='flex-2 flex items-center justify-center'>
      <StyledView className='flex items-center justify-center bg-brand50 w-[12vw] h-[12vw] rounded-full'>
        <StyledImage
          source={require('../../../assets/images/notifications.png')}
          className='w-[7vw] h-[7vw]'
        ></StyledImage>
      </StyledView>
    </StyledView>
  );
};

const WelcomeTextBlock = ({ name }: { name: string }) => {
  return (
    <StyledView className='flex-1 flex flex-col justify-center space-y-[5vh]'>
      <StyledText className='text-[2vh] font-nunitoRegular '>Hello {name}!</StyledText>
      <StyledText className='text-[3vh] font-heading'>Welcome back</StyledText>
    </StyledView>
  );
};

const WelcomeBlock = ({ name }: { name: string }) => {
  return (
    <StyledView className='flex h-[14vh] w-[100vw] items-center justify-center px-[8vw] py-[2vh]'>
      <StyledView className='flex flex-row w-full h-full'>
        <WelcomeTextBlock name={name} />
        <NotificationIconBlock />
      </StyledView>
    </StyledView>
  );
};

export default WelcomeBlock;
