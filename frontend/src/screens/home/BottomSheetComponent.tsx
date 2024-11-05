import React, { useRef} from 'react';
import { Text, View} from 'react-native';
import { styled } from 'nativewind';
import InvestmentContainer from './InvestmentContainer';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const StyledView = styled(View);
const StyledText = styled(Text);

const Investments = ({investmentsData}) => {
  return (
    <StyledView>
      <StyledText className='text-[4vw] font-heading py-[2vh]'>Your Investments</StyledText>
      <InvestmentContainer image={investmentsData[0]?.image} street={investmentsData[0]?.street} city={investmentsData[0]?.city} amount={investmentsData[0]?.amount} status={investmentsData[0]?.status}/>
    </StyledView>
  );
};


const BottomSheetComponent = ({investmentsData}) => {
  const sheetRef = useRef<BottomSheet>(null);
  return (
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={["45%", '80%']}
        enablePanDownToClose={false} // This disables the ability to swipe down to close the bottom sheet
      >
        <BottomSheetScrollView>
          <StyledView className="w-[100vw] px-[7vw]">
            <Investments investmentsData={investmentsData} />
          </StyledView>
        </BottomSheetScrollView>
      </BottomSheet>
  );
};


export default BottomSheetComponent;