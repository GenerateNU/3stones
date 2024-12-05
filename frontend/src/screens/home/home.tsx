import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useContributors } from '../../services/contributor';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

import PortfolioValue from './components/portfolioValue';
import WelcomeBlock from './components/welcomeBlock';
import BottomSheetComponent from './components/BottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { useInvestorProfile, useInvestorPortfolio } from '../../services/investor';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { signOut } = useAuth();

  const userProfile = useInvestorProfile();
  const [totalInvested, setTotalInvested] = useState(0);
  const { portfolio } = useInvestorPortfolio();

  useEffect(() => {
    if (portfolio) {
      // Sum up the total invested amount
      const total = Object.values(portfolio).reduce((sum, value) => sum + value, 0);
      setTotalInvested(total);
    }
  });

  // return (
  //   <StyledView className='flex-1 mt-12'>
  //     <Button onPress={() => { signOut(); }}>SIGN ME OUT</Button>
  //   </StyledView>
  // );
  //   <StyledView className='flex-1 items-center justify-center bg-surfaceBG'>
  //     {/* Some dummy image */}
  //     <StyledView className='align-center'>
  //       <Image source={require('../../../assets/images/icon.png')}/>
  //     </StyledView>
  //     {/* Some dummy button */}
  //     <ButtonComponent
  //             title="Continue"
  //             theme="primary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={false}
  //           />
  //           <ButtonComponent
  //             title="Continue"
  //             theme="secondary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={false}
  //           />
  //           <ButtonComponent
  //             title="Continue"
  //             theme="secondary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={true}
  //           />
  //           <TextInputComponent
  //             placeholder="Username"
  //             value=""
  //             onChangeText={() => {}}
  //             isPassword={false}
  //           />
  //           <ProgressBarComponent
  //             currentStep={1}
  //             totalSteps={3}
  //             showBack={true}
  //             showClose={false}
  //             onPress = {() => {}}
  //           />

  return (
    <GestureHandlerRootView>
      <StyledView className='flex-1 items-center bg-surfaceBG'>
        <StyledView className='pt-[5vh]'>
          <WelcomeBlock name={userProfile?.profile?.first} />
          <PortfolioValue
            Portfoliovalue={totalInvested}
            portfolioChange={350.23}
            navigation={navigation}
          />
        </StyledView>
        <BottomSheetComponent portfolio={portfolio} navigation={navigation} />
      </StyledView>
    </GestureHandlerRootView>
  );
}
