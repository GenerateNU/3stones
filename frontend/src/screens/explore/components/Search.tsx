import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import SearchBar from '../../../components/SearchBar';
import logo from '../../../../assets/images/Logo x 100.png';

interface ExploreScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function SearchScreen({ navigation }: ExploreScreenProps) {
  return (
    <StyledView className='flex-1 bg-surfaceBG'>
      {/* Explore Header */}
      <StyledView className='pt-[10vh] pl-[2vh]'>
        <StyledText className='text-[8vw] font-heading'>Explore</StyledText>
      </StyledView>

      {/* Search Bar */}
      <StyledView className='w-[100vw] flex items-center mt-[3vh]'>
        <SearchBar
          intent='unselected'
          icon='search-default'
          value='Explore investments'
          width={90}
          height={6}
          onValueChange={() => {}}
          onPressed={(evt) => {}}
          textColor=''
        />
        

        {/* Logo + No recent searches */}
        <StyledView className='w-[80vw] h-[30vh] mt-[6vh] flex items-center justify-center'>
          <StyledImage source={logo} className='w-[26vw] h-[30vw]' />
          <StyledText className='mt-[2vh] font-sourceSans3Bold text-[4vw]'>
            No recent searches yet.
          </StyledText>
          <StyledText className='mt-[1vh] font-body text-[3w]'>
            Try searching for something or explore the categories to find what you are looking for.
          </StyledText>
        </StyledView>

        
      </StyledView>
    </StyledView>
  );
}
