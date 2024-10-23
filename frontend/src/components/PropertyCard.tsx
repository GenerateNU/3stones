import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import InvestmentProgress from './InvestmentProgress';

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
    <StyledView className = 'flex flex-col p-4 bg-surfaceFG rounded-lg shadow-md'>
        <StyledView className = 'flex items-center justify-center mb-2'>
            <Image source={{ uri: imageUrl }} />
        </StyledView>
        <StyledView className = 'flex-1'>
            <StyledText className = 'text-lg' >{address}</StyledText>
            <StyledText className = 'text-sm'>{location}</StyledText>
            <StyledText className = 'text-sm'>${price.toLocaleString()}</StyledText>
            <StyledText className = 'text-sm'>{duration} months</StyledText>
        </StyledView>
        <StyledView className = 'mt-2'>
             <InvestmentProgress percentageFunded={(invested/completion)*100} />
        </StyledView>
    </StyledView>
);
};

export default PropertyCard;