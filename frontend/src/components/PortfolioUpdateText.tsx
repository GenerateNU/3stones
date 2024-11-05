import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface UpdateTextProps {
    topText: string;
    bottomText: string;
}

const UpdateText = ({topText, bottomText} : UpdateTextProps )=> {

    return (
      <StyledView className = 'flex flexDirection-column alignContent-left justifyContent-space-between p-4 w-8/10 bg-surfaceFG overflow-hidden'>
            <StyledText className = 'text-sourceSans3BodyBold'>{topText}</StyledText>
            <StyledText className = 'text-body'>{bottomText}</StyledText>
      </StyledView>
    );
};
  
export default UpdateText;