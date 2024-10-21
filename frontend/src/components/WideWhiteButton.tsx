import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import { styled } from 'nativewind';
import { NavigationScreenProp } from 'react-navigation';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);

// This button 
interface WideGreenButtonProps {
  name: string;
  iconRoute: ImageSourcePropType;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const WideWhiteButton = ({ name, iconRoute, navigation }: WideGreenButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={() => navigation.navigate('secondScreen')}
      className='w-full h-full bg-surfaceFG border-solid border-x-[0.3vw] border-y-[0.3vw] border-defaultPrimary  rounded-full flex items-center justify-center flex-row'
    >
      <StyledText className='text-[2vh] font-nunitoRegular text-defaultPrimary'>{name}</StyledText>
      <StyledImage source={iconRoute} className='w-[7vw] h-[7vw]'></StyledImage>
    </StyledTouchableOpacity>
  );
};

export default WideWhiteButton;
