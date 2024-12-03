import React from 'react';
import { Text, Image, View } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';
import Card from '../../../components/Card';

const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledView = styled(View);

const PropertyCard = ({ image, addressLine1, addressLine2, progressCurrent, progressTotal }) => {
  return (
    <StyledView style={{ height: 200, width: 230 }}>
      <Card>
        <StyledImage
          source={image}
          className='pt-[1vh] pr-[1vh] pb-[1vh]'
          style={{ width: 206, height: 94, borderRadius: 16 }}
        />
        <StyledText className='text-2xl font-sourceSans3'>{addressLine1}</StyledText>
        <StyledText className='text-1.5xl font-sourceSans3 pt-[1vh] pb-[1vh]'>
          {addressLine2}
        </StyledText>
        <ProgressBar current={progressCurrent} total={progressTotal}></ProgressBar>
      </Card>
    </StyledView>
  );
};

export default PropertyCard;
