import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import SideBySide from '../../components/SideBySide';
import CategoryCard from './components/ExploreCategoryCard';
import GenericCarousel from '../../components/carousel';
import PropertyCard from './components/PropertyCard';
import SearchBar from '../../components/SearchBar';
import property1 from './components/property-placeholder1.png';
import residential from './components/residential.png';
import newlyAdded from './components/newlyadded.png';
import commercial1 from './components/commercial.png';
import commercial2 from './components/commercial2.png';

interface ExploreScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


export default function ExploreScreen({ navigation }: ExploreScreenProps) {
  return (
    <StyledView className='flex-1 bg-surfaceBG'>
      {/* Header Section */}
      <StyledView className='pt-[10vh] pl-[2vh]'>
        <StyledText className='text-4xl font-Nunito-ExtraBold'>Explore</StyledText>
      </StyledView>

      {/* Search Bar */}
      <StyledTouchableOpacity className='pt-[3vh] pl-[2vh]' onPress={(evt) => {
            navigation.navigate('search');
          }}>
        <SearchBar
          intent='unselected'
          icon='search-default'
          value='Explore investments'
          width={90}
          height={5}
          onValueChange={() => {}}
            onPressed={(evt) => {
                navigation.navigate('search');
            }}
          
          textColor=''
        />
      </StyledTouchableOpacity>

      {/* Recommended Projects */}
      <StyledView className='pl-[2vh] pt-[5vh] pb-[2vh]'>
        <StyledText className='text-3xl font-nunitoSemiBold'>Recommended Projects</StyledText>
         {/* Carousel Section: tweak the container's height according to the height you adjust the carousel to */}
        <StyledView className='h-[35vh] pt-[2vh]'>
          <GenericCarousel
            width={80}
            height={35}
            components={[
              <PropertyCard
                key='1'
                image={property1}
                addressLine1='120 Massachusetts Ave.'
                addressLine2='Boston, MA 02119'
                progressCurrent={6}
                progressTotal={10}
              />,
              <PropertyCard
                key='2'
                image={property1}
                addressLine1='709 Sunset Blvd.'
                addressLine2='Hollywood, CA 90028'
                progressCurrent={9}
                progressTotal={10}
              />,
            ]}
          />
        </StyledView>
      </StyledView>
    

     

      {/* Popular Projects */}
      <StyledView className='pl-[2vh] pt-[2vh] pb-[10vh]'>
        <StyledText className='text-3xl font-nunitoSemiBold mb-2'>Popular Projects</StyledText>
        <StyledView className='pr-[2vh]'>
          <SideBySide
            leftComponent={<CategoryCard category='Residential' image={residential} />}
            rightComponent={<CategoryCard category='Commercial' image={commercial1} />}
          />
          <SideBySide
            leftComponent={<CategoryCard category='Newly Added' image={newlyAdded} />}
            rightComponent={<CategoryCard category='Popular' image={commercial2} />}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
