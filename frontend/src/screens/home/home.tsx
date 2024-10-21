import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

import styles from './styles';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const WelcomeBlock = ({ name }: { name: string }) => {
  return (
    <StyledView className='flex h-[14vh] w-[100vw] items-center justify-center px-[8vw] py-[2vh]'>
      <StyledView className='flex flex-row w-full h-full'>
        <StyledView className='flex-1 flex flex-col justify-center space-y-[5vh]'>
          <StyledText className='text-[2vh] font-nunitoRegular '>Hello {name}!</StyledText>
          <StyledText className='text-[3vh] font-heading'>Welcome back</StyledText>
        </StyledView>
        <StyledView className='flex-2 flex items-center justify-center'>
          <StyledView className='flex items-center justify-center bg-brand50 w-[15vw] h-[15vw] rounded-full'>
            <StyledImage
              source={require('../../../assets/images/notifications.png')}
              className='w-[9vw] h-[9vw]'
            ></StyledImage>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <StyledView className='flex-1 items-center bg-surfaceBG'>
      <StyledView className='pt-[5vh]'>
        <WelcomeBlock name='Michael' />
      </StyledView>
      {/* Some dummy image */}
      <StyledView className='align-center'>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
      </StyledView>
      {/* Some dummy button */}
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
