import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import SideBySide from '../../components/SideBySide';
import CategoryCard from './components/ExploreCategoryCard';
import GenericCarousel from '../../components/carousel';
import PropertyCard from './components/PropertyCard';
import Tag from '../../components/Tag';

interface PortfolioScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ExploreScreen({ navigation }: PortfolioScreenProps) {
  return (
    <StyledView className='flex-1 justify-center bg-surfaceBG overflow-auto'>
      <StyledText className='text-4xl align-left font-Nunito-ExtraBold'>Explore</StyledText>
      {/* Search Bar */}
      <GenericCarousel
        components={[
          // eslint-disable-next-line react/jsx-key
          <PropertyCard
            image={undefined}
            addressLine1={'120 Massachusetts Ave.'}
            addressLine2={'Boston, MA 02119'}
            progressCurrent={6}
            progressTotal={10}
          ></PropertyCard>,
          // eslint-disable-next-line react/jsx-key
          <PropertyCard
            image={undefined}
            addressLine1={'120 Massachusetts Ave.'}
            addressLine2={'Boston, MA 02119'}
            progressCurrent={6}
            progressTotal={10}
          ></PropertyCard>,
        ]}
      ></GenericCarousel>
      <StyledText className='text-3xl align-left font-Nunito-ExtraBold'>
        Recommended Projects
      </StyledText>
      <StyledText className='text-3xl align-left font-Nunito-ExtraBold'>
        Popular Projects
      </StyledText>
      <SideBySide
        leftComponent={<CategoryCard category='Residential' image={undefined}></CategoryCard>}
        rightComponent={<CategoryCard category='Commerical' image={undefined}></CategoryCard>}
      ></SideBySide>
      <SideBySide
        leftComponent={<CategoryCard category='Newly Added' image={undefined} />}
        rightComponent={<CategoryCard category='Popular' image={undefined} />}
      ></SideBySide>
    </StyledView>
  );
}
