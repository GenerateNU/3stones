import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';
import NoPaddingCard from './NoPaddingCard';

const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const CategoryCard = ({ category, image }) => {
  return (
    <StyledView className='pt-[1vh] pb-[1vh]'>
      <View style={{ width: 170, height: 170 }}>
        <NoPaddingCard>
          <StyledTouchableOpacity activeOpacity={0.8} accessibilityRole='button' className=''>
            <StyledImage source={image} className='w-full h-full opacity-80 rounded-[16px]' />
            <StyledText className='font-sourceSans3Bold absolute bottom-0 left-0 right-0 bg-white/50 p-2'>
              {category}
            </StyledText>
          </StyledTouchableOpacity>
        </NoPaddingCard>
      </View>
    </StyledView>
  );
};

export default CategoryCard;
