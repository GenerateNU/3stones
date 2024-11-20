import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import InvestmentContainer from './InvestmentContainer';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RecentlyViewedCard from './RecentlyViewedCards';


const StyledView = styled(View);
const StyledText = styled(Text);

const Investments = ({ investmentsData }) => {
  return (
    <StyledView>
      <StyledText className='text-[5vw] font-heading py-[2vh]'>Your Investments</StyledText>

      {investmentsData.map((investment, index) => (
        <StyledView key={index}>
          <InvestmentContainer
            image={investment.image}
            street={investment.street}
            city={investment.city}
            amount={investment.amount}
            status={investment.status}
          />
          <StyledView className='w-full h-[1px] bg-borderPrimary'></StyledView>
        </StyledView>
      ))}

    <StyledText className='text-[5vw] font-heading py-[2vh]'>Recently Viewed</StyledText>
    {investmentsData.map((investment, index) => (
        <StyledView key={index}>
          <RecentlyViewedCard
            image={investment.image}
            street={investment.street}
            city={investment.city}
            amount={investment.amount}
            fundingGoal={1000}
            status={investment.status}
            developmentType={"Commercial Development"}
          />
          <StyledView className='w-full h-[1px] bg-borderPrimary'></StyledView>
        </StyledView>
      ))}
    </StyledView>
  );
};

const BottomSheetComponent = ({ investmentsData }) => {
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
          <Investments investmentsData={investmentsData} />
        </StyledView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
