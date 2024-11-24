import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

interface ProfilePageNavigatorProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
  navigationName: string;
  pageName: string;
  //route to button's icon
  iconRoute?: ImageSourcePropType;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function ProfilePageNavigator({
  navigation,
  navigationName,
  pageName,
  iconRoute,
}: ProfilePageNavigatorProps) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigationName)}>
      <StyledView className='flex-row justify-between items-center self-stretch px-[4vw]'>
        <StyledView className='flex-row justify-between items-center self-stretch space-x-[4vh]'>
          {iconRoute && <StyledImage source={iconRoute} className='w-[3vh] h-[3vh]'></StyledImage>}
          <StyledText className='text-[16px] text-[#282828] font-normal'>{pageName}</StyledText>
        </StyledView>
        <StyledImage
          source={require('../../../../assets/images/side-arrow.png')}
          className='h-[3vh] w-[3vh]'
        />
      </StyledView>
    </TouchableOpacity>
  );
}
