import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { styled } from 'nativewind';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

interface TextAboveButtonProps {
    buttonText: string;
    value: string;
}

const TextAboveButton = ({buttonText, value}: TextAboveButtonProps)=> {

  return (
    <StyledView className="flex flex-col items-start">
        <StyledButton className='body-medium focus:outline-none' title={buttonText}>
        </StyledButton>
        <StyledText className='body-regular'>{value}</StyledText>
    </StyledView>

  );
};

export default TextAboveButton;