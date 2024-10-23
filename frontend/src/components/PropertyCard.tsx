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
    <StyledView className = 'flex flex-col p-4 bg-surfaceFG rounded-[18px] box-shadow'>
        <StyledView className = 'flex items-center justify-center mb-2'>
            <Image source={{ uri: imageUrl }} />
        </StyledView>
        <StyledView className = 'flex-1'>
            <StyledView className = 'flex h-[39px] flex-col justify-center shrink-0 self-stretch'>
                <StyledText className = 'body-regular' >{address}</StyledText>
                <StyledText className = 'body-regular'>{location}</StyledText>
            </StyledView>
            <StyledView className = 'flex h-[19px] flex-col justify-center shrink-0 self-stretch'>
                <StyledText className = 'caption-medium'>${price.toLocaleString()}</StyledText>
            </StyledView>
            <StyledView className = 'flex h-[19px] flex-col justify-center shrink-0 self-stretch'>
                <StyledText className = 'caption-medium'>{duration} months</StyledText>
            </StyledView>
        </StyledView>
        <StyledView className = 'mt-2'>
             <InvestmentProgress percentageFunded={(invested/completion)*100} />
        </StyledView>
    </StyledView>
);
};

export default PropertyCard;