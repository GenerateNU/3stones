import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import WideButton from '../../../components/WideButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

//Button to add funds to the account
const AddFundsButton = ({ navigation }: 
  {// This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}) => {
  return (
    <WideButton
      name={'Add Funds'}
      iconRoute={require('../../../../assets/images/attach-money.png')}
      navigation={() => navigation.navigate('Profile')}
      intent='secondary'
    ></WideButton>
  );
};

//Button to navigate to the portfolio page
const PortfolioButton = ({ navigation }) => {
  return (
    <WideButton
      name={'Portfolio'}
      iconRoute={require('../../../../assets/images/chevron-right.png')}
      navigation={() => navigation.navigate('Portfolio')}
      intent='primary'
    ></WideButton>
  );
};

const PortfolioReturns = ({ portfolioChange }) => {
  return (
    <StyledView className='flex flex-row items-center'>
      <StyledImage
        source={require('../../../../assets/images/arrow-outward.png')}
        className='w-[5vw] h-[5vw] mx-[0.75vw]'
      />
      <StyledText className='text-[2vh] font-heading color-success'>
        ${portfolioChange.toLocaleString()}
      </StyledText>
    </StyledView>
  );
};

const PortfolioStats = ({ Portfoliovalue, portfolioChange }) => {
  return (
    <StyledView className='flex-1'>
      <StyledView className='flex flex-col'>
        <StyledText className='text-[2vh] font-nunitoRegular text-defaultText'>
          Portfolio Value
        </StyledText>
        <StyledText className='text-[4vh] font-title'>
          ${Portfoliovalue.toLocaleString()}
        </StyledText>
        <PortfolioReturns portfolioChange={portfolioChange} />
      </StyledView>
    </StyledView>
  );
};

const PortfolioMoreDetailsIcon = ({ navigation }) => {
  return (
    <StyledView className='flex-2 flex justify-center h-[10vh]'>
      <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
        <StyledImage
          source={require('../../../../assets/images/more-details.png')}
          className='w-[12vw] h-[12vw]'
        />
      </TouchableOpacity>
    </StyledView>
  );
};

const PortfolioButtons = ({ navigation }: {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}) => {
  return (
    <StyledView className='flex-2 flex flex-row gap-x-4'>
      <StyledView className='flex-1 h-[5vh]'>
        <PortfolioButton navigation={navigation} />
      </StyledView>
      <StyledView className='flex-1 h-[5vh]'>
        <AddFundsButton navigation={navigation} />
      </StyledView>
    </StyledView>
  );
};

//Portfolio value component
const PortfolioValue = ({
  Portfoliovalue,
  portfolioChange,
  navigation,
}: {
  //Mock data for component
  Portfoliovalue: number;
  portfolioChange: number;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}) => {
  return (
    <StyledView className='flex flex-col  h-[30vh] items-center justify-center px-[7vw] py-[4vh]'>
      <StyledView className='flex flex-col w-full h-full'>
        <StyledView className='flex-1 flex flex-row'>
          <PortfolioStats Portfoliovalue={Portfoliovalue} portfolioChange={portfolioChange} />
          <PortfolioMoreDetailsIcon navigation={navigation} />
        </StyledView>
        <PortfolioButtons navigation={navigation} />
      </StyledView>
    </StyledView>
  );
};

export default PortfolioValue;
