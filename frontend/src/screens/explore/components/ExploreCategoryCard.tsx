import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';

const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CategoryCard = ({ category, image }) => {
  return (
    <Card>
      <StyledTouchableOpacity activeOpacity={0.8} accessibilityRole='button'>
        <StyledImage source={image} />
        <StyledText>{category}</StyledText>
      </StyledTouchableOpacity>
    </Card>
  );
};

export default CategoryCard;
