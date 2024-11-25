import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
// import { NavigationScreenProp } from 'react-navigation';
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
// interface HomeScreenProps {
//   // This actually should be `any`, so disabling the linter rule
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   navigation: NavigationScreenProp<any, any>;
// }

const StyledView = styled(View);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const mockInvestmentData = [
    {
      image:
        'https://s3-alpha-sig.figma.com/img/19e3/d758/89fc76fe69058e9d77f8b9d8eb86b52a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qovz446hIf~xAyUTxTiCn6hk2iZrDuiKF4V28Db07yMUANX9acZXKl7yN26bEWAC~P-TKCc4oteHW7MYzfzyavKGIBBmRL4scNyQWYr2EbHj~KaTboeXRSqXCAyZmnDaKb-dt-TsmBKzT7xJu8oVGUDqoFpKA2WiHWgr~EuWGIDGBHItdQFoh-acEUHsWLsmu1PoaB2TZboILtRr-KUoV-rXst-kF164GrMK4XHuHCsfRIerrP9IssKqhv0DFStz0emwlgMyBFfawxPVpwVkeufL~dgQ5TDOSwEfDHQw2jFXuVC4PLol1HGqYbQ9ZQH9B40Kz9NSrYLjZSeccTB2dw__',
      street: '931 1st Street',
      city: 'Venice Beach, CA',
      amount: 250,
      status: 'In Progress',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/19e3/d758/89fc76fe69058e9d77f8b9d8eb86b52a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qovz446hIf~xAyUTxTiCn6hk2iZrDuiKF4V28Db07yMUANX9acZXKl7yN26bEWAC~P-TKCc4oteHW7MYzfzyavKGIBBmRL4scNyQWYr2EbHj~KaTboeXRSqXCAyZmnDaKb-dt-TsmBKzT7xJu8oVGUDqoFpKA2WiHWgr~EuWGIDGBHItdQFoh-acEUHsWLsmu1PoaB2TZboILtRr-KUoV-rXst-kF164GrMK4XHuHCsfRIerrP9IssKqhv0DFStz0emwlgMyBFfawxPVpwVkeufL~dgQ5TDOSwEfDHQw2jFXuVC4PLol1HGqYbQ9ZQH9B40Kz9NSrYLjZSeccTB2dw__',
      street: '931 1st Street',
      city: 'Venice Beach, CA',
      amount: 1000,
      status: 'Funding',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/19e3/d758/89fc76fe69058e9d77f8b9d8eb86b52a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qovz446hIf~xAyUTxTiCn6hk2iZrDuiKF4V28Db07yMUANX9acZXKl7yN26bEWAC~P-TKCc4oteHW7MYzfzyavKGIBBmRL4scNyQWYr2EbHj~KaTboeXRSqXCAyZmnDaKb-dt-TsmBKzT7xJu8oVGUDqoFpKA2WiHWgr~EuWGIDGBHItdQFoh-acEUHsWLsmu1PoaB2TZboILtRr-KUoV-rXst-kF164GrMK4XHuHCsfRIerrP9IssKqhv0DFStz0emwlgMyBFfawxPVpwVkeufL~dgQ5TDOSwEfDHQw2jFXuVC4PLol1HGqYbQ9ZQH9B40Kz9NSrYLjZSeccTB2dw__',
      street: '931 1st Street',
      city: 'Venice Beach, CA',
      amount: 250,
      status: 'Sold',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/19e3/d758/89fc76fe69058e9d77f8b9d8eb86b52a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qovz446hIf~xAyUTxTiCn6hk2iZrDuiKF4V28Db07yMUANX9acZXKl7yN26bEWAC~P-TKCc4oteHW7MYzfzyavKGIBBmRL4scNyQWYr2EbHj~KaTboeXRSqXCAyZmnDaKb-dt-TsmBKzT7xJu8oVGUDqoFpKA2WiHWgr~EuWGIDGBHItdQFoh-acEUHsWLsmu1PoaB2TZboILtRr-KUoV-rXst-kF164GrMK4XHuHCsfRIerrP9IssKqhv0DFStz0emwlgMyBFfawxPVpwVkeufL~dgQ5TDOSwEfDHQw2jFXuVC4PLol1HGqYbQ9ZQH9B40Kz9NSrYLjZSeccTB2dw__',
      street: '931 1st Street',
      city: 'Venice Beach, CA',
      amount: 250,
      status: 'Funding',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/19e3/d758/89fc76fe69058e9d77f8b9d8eb86b52a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qovz446hIf~xAyUTxTiCn6hk2iZrDuiKF4V28Db07yMUANX9acZXKl7yN26bEWAC~P-TKCc4oteHW7MYzfzyavKGIBBmRL4scNyQWYr2EbHj~KaTboeXRSqXCAyZmnDaKb-dt-TsmBKzT7xJu8oVGUDqoFpKA2WiHWgr~EuWGIDGBHItdQFoh-acEUHsWLsmu1PoaB2TZboILtRr-KUoV-rXst-kF164GrMK4XHuHCsfRIerrP9IssKqhv0DFStz0emwlgMyBFfawxPVpwVkeufL~dgQ5TDOSwEfDHQw2jFXuVC4PLol1HGqYbQ9ZQH9B40Kz9NSrYLjZSeccTB2dw__',
      street: '931 1st Street',
      city: 'Venice Beach, CA',
      amount: 350,
      status: 'Funding',
    },
  ];

  const userProfile = useInvestorProfile();
  const [totalInvested, setTotalInvested] = useState(0);
  const { portfolio, isLoading } = useInvestorPortfolio();
  
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
          <PortfolioValue
            Portfoliovalue={totalInvested}
            portfolioChange={350.23}
            navigation={navigation}
          />
        </StyledView>
        <BottomSheetComponent investmentsData={mockInvestmentData} portfolio={portfolio} />
      </StyledView>
    </GestureHandlerRootView>
  );
}
