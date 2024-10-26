import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';
import PortfolioItem from '../components/PortfolioItem';

interface PortfolioScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView)

export default function PorfolioScreen({ navigation }: PortfolioScreenProps) {
  return (
    <StyledView className='flex-1 justify-center bg-surfaceBG overflow-auto'>
        <StyledView className='flex w-[372px] h-[55px] items-center shrink-0'>
        </StyledView>
        <StyledScrollView  contentContainerStyle={{ flexGrow: 1 }} className = 'flex-1' >
            <StyledView className = 'flex h-[318px] px-[20px] py-[5px] flex-col justify-center items-center gap-[10px] shrink-0'>
                < PortfolioItem address={''} location={''} price={0} duration={''} invested={0} completion={0} imageUrl={''}>

                </PortfolioItem>    
            </StyledView>
            <StyledView className = 'flex h-[300px] w-[336px] py-[10px] flex-col items-start gap-4' > 
                <StyledText className ='p-4 h-1/10 body-regular'> Your Investments </StyledText>
                <StyledView className = ''>
                    
                </StyledView>
            </StyledView>
            <StyledView className='flex w-[336px] h-8 py-2 flex-col justify-center items-start gap-[1px] mt-[40px]'>
                <StyledText className ='p-4 h-5 body-regular'> Your Investments </StyledText>
                <StyledText className ='p-4 h-[21px] body-regular'> 11 on going investments, 2 completed </StyledText>
        </StyledView>
            </StyledScrollView>
        </StyledView>

    );
}
