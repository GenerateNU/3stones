import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
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
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const userProfile = useInvestorProfile();
  const [totalInvested, setTotalInvested] = useState(0);
  const { portfolio } = useInvestorPortfolio();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (portfolio) {
      // Sum up the total invested amount
      const total = Object.values(portfolio).reduce((sum, value) => sum + value, 0);
      setTotalInvested(total);
    }
  }, [portfolio]);

  return (
    <GestureHandlerRootView>
      <StyledView className='flex-1 items-center bg-surfaceBG'>
        <StyledView className='pt-[5vh]'>
          <WelcomeBlock name={userProfile?.profile?.first} />
          <StyledTextInput className="w-[80vw] h-[10vh] border-b border-[1px]" value={searchInput} onChangeText={setSearchInput} />
          <StyledButton title="Search" onPress={() => console.log(searchInput)}>Search</StyledButton>
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
