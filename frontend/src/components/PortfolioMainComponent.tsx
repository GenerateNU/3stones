import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import FourGrid from './FourGrid';
import TextAboveButton from './TextAboveButton';

const StyledView = styled(View);
const StyledText = styled(Text);

interface PortfolioMainComponentsProps {
    investmentValue: number;
    cashBalance: number;
    pendingTransactions: number;
    expectedReturns: number;
    investedIn: number;
}

const PortfolioMainComponent = ({investmentValue, cashBalance, pendingTransactions, expectedReturns, investedIn}: PortfolioMainComponentsProps)=> {

  return (
    <StyledView className = 'flex w-[336px] h-[270px] py-[26px] flex-col items-center gap-[10px] shrink-0 rounded-[27px] bg-surfaceFG'>
        <StyledText className = 'title-bold' >{investmentValue}</StyledText>
        <StyledText className = 'body-regular' >investment value</StyledText>
        <StyledView className = 'flex-1'>
        <FourGrid component1={<TextAboveButton buttonText={'Cash Balance'} value={'$700'}>

                            </TextAboveButton>} 
                component2={<TextAboveButton buttonText={'Pending Transactions'} value={'2'}>

                            </TextAboveButton>} 
                component3={<TextAboveButton buttonText={'Expected Returns'} value={'$700'}>

                            </TextAboveButton>} 
                component4={<TextAboveButton buttonText={'Invested In'} value={'12'}>

                            </TextAboveButton>} >
            
        </FourGrid>
        </StyledView>
    </StyledView>
);
};

export default PortfolioMainComponent;