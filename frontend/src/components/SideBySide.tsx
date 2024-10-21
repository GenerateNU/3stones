import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface SideBySideProps {
    component1: React.ReactNode;
    component2: React.ReactNode;
}

const SideBySide = ({component1, component2} : SideBySideProps )=> {

    return (
        <StyledView className = 'w-8/10 flex-row align-center justify-between bg-surfaceFG rounded-lg'>
            <StyledView className = 'flex-1 w-1/2 overflow-hidden'>
                {component1}
            </StyledView>
            <StyledView className = 'flex-1 w-1/2 overflow-hidden'>
                {component2}
            </StyledView>
        </StyledView>
        );
    };
    
    export default SideBySide;
