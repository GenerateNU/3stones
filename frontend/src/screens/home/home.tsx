import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import PortfolioValue from './portfolioValue';
import WelcomeBlock from './welcomeBlock';
import InvestmentProgress from '../../components/ProgressBar';

import styles from './styles';
import ProgressBarComponent from '../../components/ProgressBar';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <StyledView className='flex-1 items-center bg-surfaceBG'>
      <StyledView className='pt-[5vh]'>
        <WelcomeBlock name='Michael' />
        <PortfolioValue
          Portfoliovalue={12345.67}
          portfolioChange={350.23}
          navigation={navigation}
        />
      </StyledView>

      {/* Progress bar (1/6). Can be used for investment progress too*/}
      <ProgressBarComponent current = {1} total = {6} />

      {/* Some dummy image */}
      <StyledView className='align-center'>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
        {/* Some dummy button */}
      </StyledView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
          <View>
            <StyledText className='align-center text-3xl font-title text-defaultText'>
              Dummy page
            </StyledText>
            <Button onPress={(evt) => {
              console.log("Hello, world!");
            }} title="Click me"></Button>
          </View>
        </TouchableOpacity>
      </View>
    </StyledView>
  );
}
