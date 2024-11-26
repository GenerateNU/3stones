import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import InvestmentContainer from './InvestmentContainer';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RecentlyViewedCard from './RecentlyViewedCards';
import WideButton from '../../../components/WideButton';
import { Portfolio } from '../../../types/investor';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const Investments = ({ portfolio, navigation }: {
  portfolio: Portfolio
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}) => {
  console.log(portfolio);
  return (
    <StyledView>
      <StyledText className='text-[5vw] font-heading py-[2vh]'>Your Investments</StyledText>
      {portfolio &&
        Object.keys(portfolio).map((projectId) => (
          <StyledTouchableOpacity onPress={() => navigation.navigate('Project')} key={projectId}>
            <InvestmentContainer projectId={projectId} />
            <StyledView className='w-full h-[1px] bg-borderPrimary'></StyledView>
          </StyledTouchableOpacity>
        ))}

      <StyledText className='text-[5vw] font-heading pt-[3vh]'>Recently Viewed</StyledText>
      {portfolio &&
        Object.keys(portfolio).map((projectId) => (
          <StyledTouchableOpacity onPress={() => navigation.navigate('Project')} key={projectId} className='mt-[3vh]'>
            <RecentlyViewedCard projectId={projectId} />
          </StyledTouchableOpacity>
        ))}

      <StyledView className='w-full my-[3vh] h-[5vh]'>
        <WideButton
          name={'Find More'}
          intent={'primary'}
          iconRoute={require('../../../../assets/images/search-white.png')}
          navigation={() => navigation.navigate('Project')}
        ></WideButton>
      </StyledView>
    </StyledView>
  );
};

const BottomSheetComponent = ({ portfolio, navigation }: {
  portfolio: Portfolio
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}) => {
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={['45%', '80%']}
      enablePanDownToClose={false} // This disables the ability to swipe down to close the bottom sheet
    >
      <BottomSheetScrollView>
        <StyledView className='w-[100vw] px-[7vw]'>
          <Investments portfolio={portfolio} navigation={navigation} />
        </StyledView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
