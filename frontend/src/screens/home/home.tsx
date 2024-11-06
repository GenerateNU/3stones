import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import PortfolioValue from './portfolioValue';
import WelcomeBlock from './welcomeBlock';
import { TitleText } from '../../components/typography';

import styles from './styles';
import Divider from '../../components/Divider';

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
      {/* Some dummy image */}
      <StyledView className='align-center'>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
        {/* Some dummy button */}
      </StyledView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
          <View>
            <TitleText>Dummy page</TitleText>
            <Button
              onPress={() => {
                console.log('Hello, world!');
              }}
              title='Click me'
            ></Button>
          </View>
        </TouchableOpacity>
      </View>
    </StyledView>
  );
}
