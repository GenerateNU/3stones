import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const PropertyCard = ({ image, addressLine1, addressLine2, progressCurrent, progressTotal }) => {
  return (
    <StyledView>
      <StyledImage source={image} />
      <StyledText className='font-sourceSans3'>{addressLine1}</StyledText>
      <StyledText className='font-sourceSans3'>{addressLine2}</StyledText>
      <ProgressBar current={progressCurrent} total={progressTotal}></ProgressBar>
    </StyledView>
  );
};

export default PropertyCard;
