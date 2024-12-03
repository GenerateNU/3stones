import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import SideBySide from '../../components/SideBySide';
import CategoryCard from './components/ExploreCategoryCard';
import GenericCarousel from '../../components/carousel';
import PropertyCard from './components/PropertyCard';
import SearchBar from '../../components/SearchBar';

interface ExploreScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ExploreScreen({ navigation }: ExploreScreenProps) {
  return (
    <StyledView className='flex-1 bg-surfaceBG'>
      {/* Header Section */}
      <StyledView className='pt-[10vh] pl-[2vh]'>
        <StyledText className='text-4xl font-Nunito-ExtraBold'>Explore</StyledText>
      </StyledView>

      <StyledView className='pt-[3vh] pl-[2vh]'>
        <SearchBar
          intent='unselected'
          icon='search-default'
          value='Explore investments'
          onValueChange={() => {}}
          onPressed={() => {}}
          textColor=''
        />
      </StyledView>

      {/* Recommended Projects */}
      <StyledView className='pl-[2vh] pt-[5vh] pb-[2vh]'>
        <StyledText className='text-3xl font-nunitoSemiBold mb-2'>Recommended Projects</StyledText>
      </StyledView>

      {/* Carousel Section */}
      <StyledView>
        <GenericCarousel
          components={[
            <PropertyCard
              key='1'
              image={undefined}
              addressLine1='120 Massachusetts Ave.'
              addressLine2='Boston, MA 02119'
              progressCurrent={6}
              progressTotal={10}
            />,
            <PropertyCard
              key='2'
              image={undefined}
              addressLine1='709 Sunset Blvd.'
              addressLine2='Hollywood, CA 90028'
              progressCurrent={9}
              progressTotal={10}
            />,
          ]}
        />
      </StyledView>

      {/* Popular Projects */}
      <StyledView className='pl-[2vh] pt-[2vh] pb-[3vh]'>
        <StyledText className='text-3xl font-nunitoSemiBold mb-2'>Popular Projects</StyledText>
        <SideBySide
          leftComponent={<CategoryCard category='Residential' image={undefined} />}
          rightComponent={<CategoryCard category='Commercial' image={undefined} />}
        />
        <SideBySide
          leftComponent={<CategoryCard category='Newly Added' image={undefined} />}
          rightComponent={<CategoryCard category='Popular' image={undefined} />}
        />
      </StyledView>
    </StyledView>
  );
}
