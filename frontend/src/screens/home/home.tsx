import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import PortfolioValue from './portfolioValue';
import WelcomeBlock from './welcomeBlock';
import RadioGroup from '../../../components/RadioGroup';

import styles from './styles';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
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

      <RadioGroup 
        choices={[
          { label: "Option 1", disabled: false, selected: false}, 
          { label: "Option 2", disabled: false, selected: false}, 
          { label: "Option 3", disabled: false, selected: true}, 
          { label: "Option 4", disabled: false, selected: false}, 
        ]}
        onSelect={(selectedChoice) => console.log(selectedChoice)}
      />
      <ProgressBarComponent current={1} total={3} />

      {/* Some dummy image */}
      <StyledView className='align-center'>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
        {/* Some dummy button */}
      </StyledView>
      {/* Some dummy button */}
      <ButtonComponent
              title="Continue"
              theme="primary"
              // do nothing for now
              onPress = {() => {}}
              disabled={false}
            />
            <ButtonComponent
              title="Continue"
              theme="secondary"
              // do nothing for now
              onPress = {() => {}}
              disabled={false}
            />
            <ButtonComponent
              title="Continue"
              theme="secondary"
              // do nothing for now
              onPress = {() => {}}
              disabled={true}
            />
            <TextInputComponent
              placeholder="Username"
              value=""
              onChangeText={() => {}}
              isPassword={false}
            />
        
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
