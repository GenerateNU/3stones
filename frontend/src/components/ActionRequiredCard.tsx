import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

interface ActionRequiredCardProps {
    address: string;
    date: string;
}

const ActionRequiredCard = ({address, date} : ActionRequiredCardProps )=> {

    return (
      <StyledView className = 'flex p-4 w-8/10 bg-surfaceFG overflow-hidden rounded-lg'>
          <StyledView className = 'flex-1 align-center'>
              <Image source={{uri: './action-required.png'}} />
              <StyledText className='text-bodyBold'>Action Required</StyledText>
          </StyledView>
          <StyledView className = 'flex-2 p-4'>
              <StyledText className = 'text-body'>Please review the offer for {address}</StyledText>
              <StyledText className = 'text-body'>Please view offer details and vote on the sale by {date}.</StyledText>
          </StyledView>
          <StyledView className = 'flex-3 p-4 w-full bg-surfaceFG overflow-hidden'>
               <StyledButton className='p-4 color-defaultPrimary text-surfaceBG' title='Offer Details' />
          </StyledView>
      </StyledView>
  );
  };
  
  export default ActionRequiredCard;