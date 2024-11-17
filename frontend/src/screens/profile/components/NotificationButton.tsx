import React from 'react';
import { Pressable, View, Image } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

interface NotificationButtonProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPress: any;
    //Need to ask about type ^
}

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

const NotificationIconBlock = () => {
    return (
      <StyledView className='flex-2 flex items-center justify-center'>
        <StyledView className='flex items-center justify-center bg-brand50 w-[12vw] h-[12vw] rounded-full'>
          <StyledImage
            source={require('../../../../assets/images/notifications.png')}
            className='w-[7vw] h-[7vw]'
          ></StyledImage>
        </StyledView>
      </StyledView>
    );
  };

export default function NotificationButton({navigation}: NotificationButtonProps, onPress) {
    return(
        <StyledPressable className='w-10 rounded-full bg-green-200 text-black'
        onPress={onPress}>
        <NotificationIconBlock/>
        </StyledPressable>
    );
}