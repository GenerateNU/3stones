import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const InvestmentProgress = ({ percentageFunded }) => {
  const investmentAmount = 2452.34; // placeholder value

  return (
    <StyledView className='p-4 bg-border rounded-lg'>
      <StyledView className='w-full h-3 bg-surfaceFG rounded-full mb-1 overflow-hidden'>
        <StyledView
          className='h-full bg-disabledText rounded-full'
          // tailwindcss doesn't support dynamic styles, so we have to use inline styles
          style={{ width: `${percentageFunded}%` }}
        />
      </StyledView>
      <StyledText className='text-lg'>
        ${investmentAmount.toFixed(2)} invested · {percentageFunded}% funded
      </StyledText>
    </StyledView>
  );
};

export default InvestmentProgress;
