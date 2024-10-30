import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { styled } from 'nativewind';


const StyledView = styled(View);
const StyledText = styled(Text);

const PortfolioDetails = ()=> {
    return (
        <StyledView className = 'w-full flex flex-col items-start gap-6 self-stretch px-6 pb-8 pt-0'>
            {/* Top Part */}
            <StyledView className = 'flex flex-col items-start gap-1 self-stretch'>
                <StyledText>Net Portfolio Value</StyledText>
                <StyledText className = 'font-bold'>$12,345.67</StyledText>
                <StyledView className = 'flex flex-row justify-between items-center'>
                    <StyledText className = 'color-success'>$350.23</StyledText>
                    <StyledText className = 'color-success px-4'>+ 9.70%</StyledText>
                    <StyledText>Total Return</StyledText>
                </StyledView>
            </StyledView>
            {/* Four grid */}
            <StyledView className = 'flex flex-col p-4 w-full items-center'> 
                <StyledView className = 'flex-row gap-5 p-4'>
                    <StyledView className = 'flex justify-center w-1/2'>
                        <StyledView className = 'flex flex-col items-start gap-1'>
                            <StyledText> Market Value</StyledText>
                            <StyledText> $10,000.00</StyledText>
                        </StyledView>
                    </StyledView>
                    <StyledView className = 'flex justify-center w-1/2 items-end'>
                        <StyledView className = 'flex flex-col items-start gap-1'>
                            <StyledText> Cash Value</StyledText>
                            <StyledText> $2,345.67</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            <StyledView className = 'flex-row gap-5 p-4 '>
                <StyledView className = 'flex justify-center w-1/2'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                            <StyledText> Total Positions</StyledText>
                            <StyledText> 11</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className = 'flex justify-center w-1/2 items-end'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                            <StyledText> Exp Maturity</StyledText>
                            <StyledText> 12.5 Years</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
            </StyledView>

        </StyledView>

    );
};

export default PortfolioDetails;