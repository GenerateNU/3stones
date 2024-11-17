import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';
import PortfolioItem from './components/PortfolioItem';
import PortfolioDetails from './components/PortfolioDetails';
import UpdateCard from './components/PortfolioUpdateCard';

interface PortfolioScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);
const StyledTouchableOpacity= styled(TouchableOpacity);


  

export default function PorfolioScreen({ navigation }: PortfolioScreenProps) {

  const [activeTab, setActiveTab] = useState('Your Projects');

  return (
    <StyledView className='flex-1 justify-center bg-surfaceBG overflow-auto'>
      
      {/* Padding */}
      <StyledView className='flex w-93 h-14 items-center shrink-0'></StyledView>

      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex-1'>
        <StyledView className='flex justify-between items-left self-stretch px-6 py-3'>
          <StyledView className='flex flex-row justify-between'>
            <StyledText>Your Portfolio</StyledText>
            <StyledView className='items-right justify-right'>
              {/* <StyledImage
                source={require('../../assets/images/remove_red_eye.png')}
                className='w-[6vw] h-[6vw]'
              ></StyledImage> */}
            </StyledView>
          </StyledView>
        </StyledView>
        
        <PortfolioDetails></PortfolioDetails>

        {/* Tab section */}
        <StyledView className='flex-row justify-center'>
          <StyledView className = ' py-2.5 px-5 bg-white cursor-pointer transition-colors duration-300 hover:bg-gray-100 active:bg-green-900 active:text-white'>
              <StyledTouchableOpacity onPress={() => setActiveTab('Your Projects')} className={`items-center py-2 rounded-t-lg ${activeTab === 'Your Projects' ? 'bg-green-900' : 'bg-white'}`}>
                <StyledText className={`text-lg font-bold ${activeTab === 'Your Projects' ? 'text-white' : 'text-gray-800'}`}>
                  Your Projects
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <StyledView className = ' py-2.5 px-5 bg-white cursor-pointer transition-colors duration-300 hover:bg-gray-100 active:bg-green-900 active:text-white'>
              <StyledTouchableOpacity onPress={() => setActiveTab('Updates')} className={` items-center py-2 rounded-t-lg ${activeTab === 'Updates' ? 'bg-green-900' : 'bg-white'}`}>
                <StyledText className={`text-lg font-bold ${ activeTab === 'Updates' ? 'text-white' : 'text-gray-800'}`}>
                  Updates
                </StyledText>
              </StyledTouchableOpacity>
        </StyledView>
        </StyledView>

        <StyledView className="p-5 bg-gray-50 border border-gray-300 rounded-b-lg">
          {/*Your Projects*/}
        {activeTab === 'Your Projects' ? (
        <StyledView className='flex w-98 p-[16px_24px] flex-col items-start gap-3 rounded-[27px] bg-white'>
          <StyledText className='font-sourceSans3CaptionMedium text-defaultText'>
          {' '}
          8 Total Investments
        </StyledText>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
        <PortfolioItem
          address={''}
          location={''}
          price={0}
          duration={''}
          invested={0}
          completion={0}
          imageUrl={''}
        ></PortfolioItem>
      </StyledView>) 
      : 
        (<StyledView className='flex w-98 p-[16px_24px] flex-col items-start gap-3 rounded-[27px] bg-white'>
          {/* Updates */}
            <UpdateCard topText='931 1st Street' bottomText='You invested $200' quantity='+$200.00' />
        </StyledView>
          )}
      </StyledView>

       
        
        
      </StyledScrollView>
    </StyledView>
  );
}
