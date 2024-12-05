import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { SubheadingText } from '../../../components/Typography';

interface ProfilePageNavigatorProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
  navigationName: string;
  pageName: string;
  //route to button's icon
  leftIconRoute?: ImageSourcePropType;
}

const StyledView = styled(View);
const StyledImage = styled(Image);

export default function PageHeaderNavigation({
  navigation,
  navigationName,
  pageName,
  leftIconRoute,
}: ProfilePageNavigatorProps) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigationName)}>
      <StyledView className='flex-row justify-left items-center self-stretch space-x-[vh]'>
        {leftIconRoute && <StyledImage source={leftIconRoute} className='w-[3vh] h-[3vh]' />}
        <StyledView className='flex-row py-[2vh] px-[4vw] justify-between'>
          <SubheadingText className='text-3xl font-semibold'>{pageName}</SubheadingText>
        </StyledView>
      </StyledView>
    </TouchableOpacity>
  );
}
