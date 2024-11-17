import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CategoryCard = ({ category, image }) => {
  return (
    <StyledView>
      <StyledTouchableOpacity>
        <StyledImage source={image} />
        <StyledText>{category}</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default CategoryCard;
