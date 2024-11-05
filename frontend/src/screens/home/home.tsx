import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import PortfolioValue from './portfolioValue';
import WelcomeBlock from './welcomeBlock';
import BottomSheetComponent from './BottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';


interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);



export default function HomeScreen({ navigation }: HomeScreenProps) {
  const mockInvestmentData = [
    {
      image: "https://s3-alpha-sig.figma.com/img/c1b5/297f/09c829e9e47c8f61bdcd1374fa986706?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8mZcIrgMXP1QuNfAKUa-UV3fEvuRRql-wJKLeLI5U7cw-C3HWCactXAaoFfrzzm~Gcmr43MTbvF4TDUVYUZplgr76zNCUjZP3Z8pbbCWS0DDojdkhXxm4yl6U-FN7CQjtyyO~e-Z5l5yP~zePSGlnzv6xULnZa3J0wab1zpgJ4WaLSCJsVnzZo-MHTWl-oSEeD5JGX8Q6wNlKby0Y6iBIyw3uQWYMuzu~fdVg-GHB9p7ptY4R-tTAXkOmMZuSoX4ieXH09isq6U67Tb6qxUVvotYnsWK-KedLgd7lKomjmN3xgYzma~aCripaka8In5T6-gFTMxUCCIlVV0LMZi~w__",
      street: "931 1st Street",
      city: "Venice Beach, CA",
      amount: 250,
      status: "Funding"
    }, 
    {
      image: "https://s3-alpha-sig.figma.com/img/c1b5/297f/09c829e9e47c8f61bdcd1374fa986706?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8mZcIrgMXP1QuNfAKUa-UV3fEvuRRql-wJKLeLI5U7cw-C3HWCactXAaoFfrzzm~Gcmr43MTbvF4TDUVYUZplgr76zNCUjZP3Z8pbbCWS0DDojdkhXxm4yl6U-FN7CQjtyyO~e-Z5l5yP~zePSGlnzv6xULnZa3J0wab1zpgJ4WaLSCJsVnzZo-MHTWl-oSEeD5JGX8Q6wNlKby0Y6iBIyw3uQWYMuzu~fdVg-GHB9p7ptY4R-tTAXkOmMZuSoX4ieXH09isq6U67Tb6qxUVvotYnsWK-KedLgd7lKomjmN3xgYzma~aCripaka8In5T6-gFTMxUCCIlVV0LMZi~w__",
      street: "931 1st Street",
      city: "Venice Beach, CA",
      amount: 250,
      status: "Funding"
    }, 
    {
      image: "https://s3-alpha-sig.figma.com/img/c1b5/297f/09c829e9e47c8f61bdcd1374fa986706?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8mZcIrgMXP1QuNfAKUa-UV3fEvuRRql-wJKLeLI5U7cw-C3HWCactXAaoFfrzzm~Gcmr43MTbvF4TDUVYUZplgr76zNCUjZP3Z8pbbCWS0DDojdkhXxm4yl6U-FN7CQjtyyO~e-Z5l5yP~zePSGlnzv6xULnZa3J0wab1zpgJ4WaLSCJsVnzZo-MHTWl-oSEeD5JGX8Q6wNlKby0Y6iBIyw3uQWYMuzu~fdVg-GHB9p7ptY4R-tTAXkOmMZuSoX4ieXH09isq6U67Tb6qxUVvotYnsWK-KedLgd7lKomjmN3xgYzma~aCripaka8In5T6-gFTMxUCCIlVV0LMZi~w__",
      street: "931 1st Street",
      city: "Venice Beach, CA",
      amount: 250,
      status: "Funding"
    }, 
    {
      image: "https://s3-alpha-sig.figma.com/img/c1b5/297f/09c829e9e47c8f61bdcd1374fa986706?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8mZcIrgMXP1QuNfAKUa-UV3fEvuRRql-wJKLeLI5U7cw-C3HWCactXAaoFfrzzm~Gcmr43MTbvF4TDUVYUZplgr76zNCUjZP3Z8pbbCWS0DDojdkhXxm4yl6U-FN7CQjtyyO~e-Z5l5yP~zePSGlnzv6xULnZa3J0wab1zpgJ4WaLSCJsVnzZo-MHTWl-oSEeD5JGX8Q6wNlKby0Y6iBIyw3uQWYMuzu~fdVg-GHB9p7ptY4R-tTAXkOmMZuSoX4ieXH09isq6U67Tb6qxUVvotYnsWK-KedLgd7lKomjmN3xgYzma~aCripaka8In5T6-gFTMxUCCIlVV0LMZi~w__",
      street: "931 1st Street",
      city: "Venice Beach, CA",
      amount: 250,
      status: "Funding"
    }, 
    {
      image: "https://s3-alpha-sig.figma.com/img/c1b5/297f/09c829e9e47c8f61bdcd1374fa986706?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8mZcIrgMXP1QuNfAKUa-UV3fEvuRRql-wJKLeLI5U7cw-C3HWCactXAaoFfrzzm~Gcmr43MTbvF4TDUVYUZplgr76zNCUjZP3Z8pbbCWS0DDojdkhXxm4yl6U-FN7CQjtyyO~e-Z5l5yP~zePSGlnzv6xULnZa3J0wab1zpgJ4WaLSCJsVnzZo-MHTWl-oSEeD5JGX8Q6wNlKby0Y6iBIyw3uQWYMuzu~fdVg-GHB9p7ptY4R-tTAXkOmMZuSoX4ieXH09isq6U67Tb6qxUVvotYnsWK-KedLgd7lKomjmN3xgYzma~aCripaka8In5T6-gFTMxUCCIlVV0LMZi~w__",
      street: "931 1st Street",
      city: "Venice Beach, CA",
      amount: 250,
      status: "Funding"
    }, 
  ];

  return (
    <GestureHandlerRootView>
    <StyledView className='flex-1 items-center bg-surfaceBG'>
      <StyledView className='pt-[5vh]'>
        <WelcomeBlock name='Michael' />
        <PortfolioValue
          Portfoliovalue={12345.67}
          portfolioChange={350.23}
          navigation={navigation}
        />
      </StyledView>
      <BottomSheetComponent investmentsData={mockInvestmentData}/>
      </StyledView>
      </GestureHandlerRootView>
  );
}
