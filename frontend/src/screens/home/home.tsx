import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import WideGreenButton from '../../components/WideGreenButton';
import WideWhiteButton from '../../components/WideWhiteButton';

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
          <StyledView className='flex items-center justify-center bg-brand50 w-[12vw] h-[12vw] rounded-full'>
            <StyledImage
              source={require('../../../assets/images/notifications.png')}
              className='w-[7vw] h-[7vw]'
            ></StyledImage>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

const PortfolioValue = ({
  Portfoliovalue,
  Portfoliochange,
  navigation,
}: {
  Portfoliovalue: number;
  Portfoliochange: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}) => {
  return (
    <StyledView className='flex flex-col  h-[30vh] items-center justify-center px-[7vw] py-[4vh]'>
      <StyledView className='flex flex-col w-full h-full'>
        <StyledView className='flex-1 flex flex-row'>
          <StyledView className='flex-1'>
            <StyledView className='flex flex-col'>
              <StyledText className='text-[2vh] font-nunitoRegular text-defaultText'>
                Portfolio Value
              </StyledText>
              <StyledText className='text-[4vh] font-title'>
                ${Portfoliovalue.toLocaleString()}
              </StyledText>
              <StyledView className='flex flex-row items-center'>
                <StyledImage
                  source={require('../../../assets/images/arrow-outward.png')}
                  className='w-[5vw] h-[5vw] mx-[0.75vw]'
                />
                <StyledText className='text-[2vh] font-heading color-success'>
                  ${Portfoliochange.toLocaleString()}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
          <StyledView className='flex-2 flex justify-center h-[10vh]'>
            <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
              <StyledImage
                source={require('../../../assets/images/more-details.png')}
                className='w-[12vw] h-[12vw]'
              />
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        <StyledView className='flex-2 flex flex-row gap-x-4'>
          <StyledView className='flex-1 h-[5vh]'>
            <WideGreenButton
              name={'Portfolio'}
              iconRoute={require('../../../assets/images/chevron-right.png')}
              navigation={navigation}
            ></WideGreenButton>
          </StyledView>
          <StyledView className='flex-1 h-[5vh]'>
            <WideWhiteButton
              name={'Portfolio'}
              iconRoute={require('../../../assets/images/attach-money.png')}
              navigation={navigation}
            ></WideWhiteButton>
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
        <PortfolioValue
          Portfoliovalue={12345.67}
          Portfoliochange={350.23}
          navigation={navigation}
        />
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
