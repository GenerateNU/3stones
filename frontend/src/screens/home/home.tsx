import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
// import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '@env';
import { Text, View, Button } from 'react-native';

import styles from './styles';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}
// interface HomeScreenProps {
//   // This actually should be `any`, so disabling the linter rule
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   navigation: NavigationScreenProp<any, any>;
// }

const StyledView = styled(View);
const StyledText = styled(Text);

// Log out button to test authentication
const TestLogOut = () => {
  const { signOut, session } = useAuth();
  const [developers, setDevelopers] = useState([]);

  // Test function to get token from session
  const getToken = () => {
    const token = session.access_token;

    //test getting token
    console.log(token);

    return token;
  };

  // Test endpoint to get all developers from backend
  const getDevelopers = async () => {
    console.log(`${BASE_URL}/api/v1/developers`);
    const token = session.access_token;
    const response = await fetch(`${BASE_URL}/api/v1/developers`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    console.log(data);
    setDevelopers(data);
  };

  useEffect(() => {
    getToken();
    getDevelopers();
  }, []);

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
    <StyledView className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <Button
        title='Log Out'
        onPress={() => {
          signOut();
        }}
      />
      <StyledText>{developers}</StyledText>
    </StyledView>
  );
};

export default function HomeScreen() {
  return (
    <GestureHandlerRootView>
      <StyledView className='flex-1 items-center bg-surfaceBG'>
        <StyledView className='pt-[5vh]'>
          <TestLogOut />
        </StyledView>
      </StyledView>
    </GestureHandlerRootView>
  );
}
