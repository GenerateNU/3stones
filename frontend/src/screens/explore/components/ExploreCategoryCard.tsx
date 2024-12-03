import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';

const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const CategoryCard = ({ category, image }) => {
  return (
    <View style={{ width: 150, height: 150 }}>
      <Card>
        <StyledTouchableOpacity activeOpacity={0.8} accessibilityRole='button' className=''>
          <StyledImage source={image} className='w-full h-full opacity-80' />
          <StyledText className='font-sourceSans3Bold absolute bottom-0 left-0 right-0 bg-white/50 p-2'>
            {category}
          </StyledText>
        </StyledTouchableOpacity>
      </Card>
    </View>
  );
};

export default CategoryCard;
