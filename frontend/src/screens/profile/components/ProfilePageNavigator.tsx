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
  // Route to button's icon
  iconRoute?: ImageSourcePropType;
  // Optional additional navigation parameters
  navigationParams?: boolean;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function ProfilePageNavigator({
  navigation,
  navigationName,
  pageName,
  iconRoute,
  navigationParams, // Accept additional params
}: ProfilePageNavigatorProps) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigationName, navigationParams)}>
      <StyledView className='flex-row justify-between items-center self-stretch px-[4vw]'>
        <StyledView className='flex-row justify-between items-center self-stretch space-x-[4vh]'>
          {iconRoute && <StyledImage source={iconRoute} className='w-[3vh] h-[3vh]' />}
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
