import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { styled } from 'nativewind';

interface GenericCarouselProps {
  components: React.ReactNode[]; // ReactNode allows you to pass JSX elements
  width: number;
  height: number;
}
const StyledView = styled(View);

// height and width arguments are % values of the screen for example, passing 80 into the width argument will make the carousel 80% of the screen width
export default function GenericCarousel({ components, width, height }: GenericCarouselProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const carouselWidth = (width / 100) * screenWidth;
  const carouselHeight = (height / 100) * screenHeight;
  return (
      <Carousel
        width={carouselWidth}
        height={carouselHeight}
        data={components}
        renderItem={({ item }) => (
          <StyledView className='flex justify-center items-center bg-lightgray'>
            {item}
          </StyledView>
        )}
        scrollAnimationDuration={1000}
      />
  );
}
