import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import InvestmentProgress from './InvestmentProgress';

import styles from '/Users/abbystevenson/Desktop/Northeastern/Extra Curriculars/Generate/3stones/frontend/src/screens/home/styles.ts';
const StyledView = styled(View);
const StyledText = styled(Text);

interface PropertyCardProps {
    address: string;
    location: string;
    price: number;
    duration: string;
    invested: number;
    completion: number;
    imageUrl: string;
  }

const PropertyCard = ({address, location, price, duration, invested, completion, imageUrl} : PropertyCardProps )=> {

  return (
    <StyledView className = 'flex p-4 w-80 bg-surfaceFG overflow-hidden rounded-lg'>
        <StyledView className = 'flex-1 align-center'>
            <Image source={{ uri: imageUrl }}  style={styles.imageStyle}/>
        </StyledView>
        <StyledView className = 'flex-2 p-4'>
            <StyledText className = 'text-2xl' >{address}</StyledText>
            <StyledText className = 'text-lg'>{location}</StyledText>
            <StyledText className = 'text-lg'>${price.toLocaleString()}</StyledText>
            <StyledText className = 'text-lg'>{duration} months</StyledText>
        </StyledView>
        <StyledView className = 'flex-3 p-4 w-full bg-surfaceFG overflow-hidden'>
             <InvestmentProgress percentageFunded={(invested/completion)*100} />
        </StyledView>
    </StyledView>
);
};

export default PropertyCard;