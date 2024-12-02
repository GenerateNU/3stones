import React from 'react';
import { Text, Image } from 'react-native';
import { styled } from 'nativewind';
import ProgressBar from '../../../components/ProgressBar';
import Card from '../../../components/Card';
import Tag from '../../../components/Tag';

const StyledText = styled(Text);
const StyledImage = styled(Image);

const PropertyCard = ({ image, addressLine1, addressLine2, progressCurrent, progressTotal }) => {
  return (
    <Card>
      <StyledImage source={image} />
      <Tag>
        <StyledText>Funding</StyledText>
      </Tag>
      <StyledText className='font-sourceSans3'>{addressLine1}</StyledText>
      <StyledText className='font-sourceSans3'>{addressLine2}</StyledText>
      <ProgressBar current={progressCurrent} total={progressTotal}></ProgressBar>
    </Card>
  );
};

export default PropertyCard;
