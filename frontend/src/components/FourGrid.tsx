import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface FourGridProps {
    component1: React.ReactNode;
    component2: React.ReactNode;
    component3: React.ReactNode;
    component4: React.ReactNode;
}

const FourGrid = ({component1, component2, component3, component4} : FourGridProps )=> {

    return (
        <StyledView className = 'flex flex-col p-4 w-full items-center'> 
        <StyledView className = 'flex-row gap-[21px] p-4'>
            <StyledView className = 'flex justify-center w-1/2'>
                {component1}
            </StyledView>
            <StyledView className = 'flex justify-center w-1/2'>
                {component2}
            </StyledView>
        </StyledView>
            <StyledView className = 'flex-row gap-[21px] p-4 '>
            <StyledView className = 'flex justify-center w-1/2'>
                {component3}
            </StyledView>
            <StyledView className = 'flex justify-center w-1/2'>
                {component4}
            </StyledView>
            </StyledView>
        </StyledView>
        );
    };
    
    export default FourGrid;
