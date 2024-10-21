import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

import styles from './styles';
import PropertyCard from '../../components/PropertyCard';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <StyledView className='flex-1 items-center justify-center bg-surfaceBG'>
      {/* Some dummy image */}
      <StyledView className='align-center'>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
      </StyledView>
      {/* Some dummy button */}
      <PropertyCard address={'480 Mass Ave.'} 
      location={'Boston, MA 02119'} 
      price={170000} 
      duration={'6'} 
      invested={50} 
      completion={100} 
      imageUrl={'frontend/assets/images/splash.png'} />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
          <View>
            <StyledText className='align-center text-3xl font-title text-defaultText'>
              Dummy page
            </StyledText>
          </View>
        </TouchableOpacity>
      </View>
    </StyledView>
  );
}
