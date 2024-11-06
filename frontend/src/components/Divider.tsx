import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { styled } from 'nativewind';
import { CaptionText } from './typography';

const StyledView = styled(View);
const StyledImage = styled(Image);

/**
 * Allows us to conditionally render the image or text for the divider.
 * I believe this is different from CVA b/c the format should be the same every time,
 * but the rendered components will be different.
 */
interface DividerProps {
  text?: string;
  image?: ImageSourcePropType;
}

const Divider: React.FC<DividerProps> = ({ text, image }) => {
  return (
    <StyledView className='relative flex-row items-center w-full'>
      <StyledView className='flex-1 h-[0.2vh] bg-gray-300' />
      {text && (
        //Allows for conditional rendering of text element
        //Text element styling is taken from typography.tsx
        <StyledView className='items-center px-[0.5vh]'>
          <CaptionText className='text-gray-300'>{text}</CaptionText>
        </StyledView>
      )}
      {image && (
        //Allows for conditional rendering of image element
        <StyledView className='items-center px-[0.5vh]'>
          <StyledImage source={image} className='w-[5vw] h-[5vw]' />
        </StyledView>
      )}
      <StyledView className='flex-1 h-[0.2vh] bg-gray-300' />
    </StyledView>
  );
};

export default Divider;
