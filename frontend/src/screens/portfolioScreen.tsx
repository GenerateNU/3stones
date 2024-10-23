import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';

import PropertyCard from '../components/PropertyCard';
import FourGrid from '../components/FourGrid';

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
            <StyledView className='flex w-[336px] h-[64px] py-[10px] flex-col justify-center items-start gap-[1px] shrink-0'>
                <StyledText className ='p-4 text-lg'> Your Investments </StyledText>
                <StyledText className ='p-4 text-lg'> 11 on going investments, 2 completed </StyledText>
        </StyledView>
            <FourGrid 
                component1={<PropertyCard 
                                address={'480 Mass Ave.'} 
                                location={'Boston, MA 02119'} 
                                price={170000} 
                                duration={'6'} 
                                invested={50} 
                                completion={100} 
                                imageUrl={'frontend/assets/images/splash.png'} />} 
                component2={<PropertyCard 
                                address={'480 Mass Ave.'} 
                                location={'Boston, MA 02119'} 
                                price={170000} 
                                duration={'6'} 
                                invested={50} 
                                completion={100} 
                                imageUrl={'frontend/assets/images/splash.png'} />}
                component3={<PropertyCard 
                                address={'480 Mass Ave.'} 
                                location={'Boston, MA 02119'} 
                                price={170000} 
                                duration={'6'} 
                                invested={50} 
                                completion={100} 
                                imageUrl={'frontend/assets/images/splash.png'} />} 
                component4={<PropertyCard 
                                address={'480 Mass Ave.'} 
                                location={'Boston, MA 02119'} 
                                price={170000} 
                                duration={'6'} 
                                invested={50} 
                                completion={100} 
                                imageUrl={'frontend/assets/images/splash.png'} />} >
            </FourGrid>
            </StyledScrollView>
        </StyledView>

    );
}
