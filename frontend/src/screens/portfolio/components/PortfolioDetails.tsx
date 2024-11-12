import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const PortfolioDetails = ()=> {
    return (
        <StyledView className = 'w-full flex flex-col items-start gap-6 self-stretch px-6 pb-8 pt-0'>
            {/* Top Part */}
            <StyledView className = 'flex flex-col items-start gap-1 self-stretch'>
                <StyledView className = 'flex flex-row'> 
                    <StyledText className = 'font-body text-[16px]'>Net Portfolio Value</StyledText>
                    <StyledView className = 'px-2'>
                        <StyledImage
                            source={require('../../../../assets/images/remove_red_eye.png')}
                            className='w-[5vw] h-[5vw]'
                        ></StyledImage>
                    </StyledView>
                </StyledView>
                <StyledText className = 'font-bold text-[32px]'>$12,345.67</StyledText>
                <StyledView className = 'flex flex-row justify-between items-center'>
                    <StyledText className = 'color-success font-sourceSans3Bold text-[16px]'>+ $350.23</StyledText>
                    <StyledText className = 'color-success px-4 font-sourceSans3Bold text-[16px]'>+ 9.70%</StyledText>
                    <StyledText className = 'font-bodyBold text-[16px]'>Total Return</StyledText>
                </StyledView>
            </StyledView>
            {/* Four grid */}
            <StyledView className = 'w-full flex-row justify-between'> 
                <StyledView className = 'flex flex-col gap-6'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Market Value</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>$10,000.00</StyledText>
                    </StyledView>
                        <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Cash Value</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>$2,345.67</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className = 'flex flex-col gap-6'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Total Positions</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'> 11</StyledText>
                    </StyledView>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Exp Maturity</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>12.5 Years</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>

    );
};

export default PortfolioDetails;