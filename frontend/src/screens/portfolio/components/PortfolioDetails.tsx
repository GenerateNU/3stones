import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface PortfolioDetailsProps {
    netPortfolioValue: number;
    portfolioChangeAmount: number;
    marketValue: number;
    cashValue: number;
    totalProjects: number;
    expMaturity: number;
    
}

const PortfolioDetails = ({netPortfolioValue, portfolioChangeAmount, marketValue, cashValue, totalProjects, expMaturity} : PortfolioDetailsProps & { className?: string })=> {
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
                <StyledText className = 'font-bold text-[32px]'>{netPortfolioValue}</StyledText>
                <StyledView className = 'flex flex-row justify-between items-center'>
                    <StyledText className = 'color-success font-sourceSans3Bold text-[16px]'> {portfolioChangeAmount}</StyledText>
                    <StyledText className = 'color-success px-4 font-sourceSans3Bold text-[16px]'>{portfolioChangeAmount/netPortfolioValue*100}</StyledText>
                    <StyledText className = 'font-bodyBold text-[16px]'>Total Return</StyledText>
                </StyledView>
            </StyledView>
            {/* Four grid */}
            <StyledView className = 'w-full flex-row justify-between'> 
                <StyledView className = 'flex flex-col gap-6'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Market Value</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>{marketValue}</StyledText>
                    </StyledView>
                        <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Cash Value</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>{cashValue}</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className = 'flex flex-col gap-6'>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Total Projects</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>{totalProjects}</StyledText>
                    </StyledView>
                    <StyledView className = 'flex flex-col items-start gap-1'>
                        <StyledText className = 'font-body text-[16px]'>Exp Maturity</StyledText>
                        <StyledText className = 'font-sourceSans3Bold text-[18px]'>{expMaturity}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>

    );
};

export default PortfolioDetails;