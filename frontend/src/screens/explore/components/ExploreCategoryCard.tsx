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
    <View style={{ width: 170, height: 400 }}>
      <Card>
        <StyledTouchableOpacity activeOpacity={0.8} accessibilityRole='button' className=''>
          <StyledImage source={image} />
          <StyledText>{category}</StyledText>
        </StyledTouchableOpacity>
      </Card>
    </View>
  );
};

export default CategoryCard;
