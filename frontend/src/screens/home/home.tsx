import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

import styles from './styles';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';

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
            <ProgressBarComponent
              currentStep={1}
              totalSteps={3}
              showBack={true}
              showClose={false}
              onPress = {() => {}}
            />

        
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
