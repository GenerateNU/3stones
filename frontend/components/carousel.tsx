import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { styled } from 'nativewind';

interface GenericCarouselProps {
  components: React.ReactNode[]; // ReactNode allows you to pass JSX elements
}
const StyledView = styled(View);


export default function GenericCarousel({ components }: GenericCarouselProps) {
  const width = Dimensions.get('window').width;
  
  return (
    <StyledView className='flex-1'>
      <Carousel
        width={width}
        height={width}
        data={components}
        renderItem={({ item }) => (
          <StyledView className="flex-1 justify-center items-center bg-lightgray">
            {item}
          </StyledView>
        )}
        scrollAnimationDuration={1000}
      />
    </StyledView>
  );
}
