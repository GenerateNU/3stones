import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface WideGreenButtonProps {
  name: string;
  iconRoute: ImageSourcePropType;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const WideGreenButton = ({ name, iconRoute, navigation }: WideGreenButtonProps) => {
  return (
      <StyledTouchableOpacity
        onPress={() => navigation.navigate('secondScreen')}
        className='w-full h-full bg-defaultPrimary rounded-full flex items-center justify-center flex-row'
      >
        <StyledText className='text-[2vh] font-nunitoRegular text-surfaceFG'>{name}</StyledText>
        <StyledImage source={iconRoute} className='w-[7vw] h-[7vw]'></StyledImage>
      </StyledTouchableOpacity>
  );
};

export default WideGreenButton;
