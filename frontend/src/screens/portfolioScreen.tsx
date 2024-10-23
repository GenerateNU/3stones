import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

import PropertyCard from '../components/PropertyCard';
import SideBySide from '../components/SideBySide';
import ActionRequiredCard from '../components/ActionRequiredCard';

interface PortfolioScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function PorfolioScreen({ navigation }: PortfolioScreenProps) {
  return (
    <><ActionRequiredCard address={'336 Oak Ave. Riverton, TX'} date={'September 30, 2024'} />
    <StyledView className='flex-1 justify-center bg-surfaceBG'>
      <StyledText className='p-4 text-lg'> Your Investments </StyledText>
      <StyledText className='p-4 text-lg'> 11 on going investments, 2 completed </StyledText>
      <StyledView className='h-3/4'>
        <SideBySide
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
            imageUrl={'frontend/assets/images/splash.png'} />}>
        </SideBySide>
        <SideBySide
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
            imageUrl={'frontend/assets/images/splash.png'} />}>
        </SideBySide>
      </StyledView>
      <StyledView className='flex-1 items-center justify-center bg-surfaceBG'>
        <SideBySide component1={<PropertyCard address={'480 Mass Ave.'}
          location={'Boston, MA 02119'}
          price={170000}
          duration={'6'}
          invested={50}
          completion={100}
          imageUrl={'frontend/assets/images/splash.png'} />} component2={<PropertyCard address={'480 Mass Ave.'}
            location={'Boston, MA 02119'}
            price={170000}
            duration={'6'}
            invested={50}
            completion={100}
            imageUrl={'frontend/assets/images/splash.png'} />}>
        </SideBySide>
        <SideBySide component1={<PropertyCard address={'480 Mass Ave.'}
          location={'Boston, MA 02119'}
          price={170000}
          duration={'6'}
          invested={50}
          completion={100}
          imageUrl={'frontend/assets/images/splash.png'} />} component2={<PropertyCard address={'480 Mass Ave.'}
            location={'Boston, MA 02119'}
            price={170000}
            duration={'6'}
            invested={50}
            completion={100}
            imageUrl={'frontend/assets/images/splash.png'} />}>
        </SideBySide>
      </StyledView>
    </StyledView></>
    );
}
