import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioDetails from '../components/PortfolioDetails';
import UpdateCard from '../components/PortfolioUpdateCard';

interface PortfolioScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

export default function PorfolioScreen({ navigation }: PortfolioScreenProps) {
  return (
    <StyledView className='flex-1 justify-center bg-surfaceBG overflow-auto'>
      <StyledView className='flex w-93 h-14 items-center shrink-0'></StyledView>
      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex-1'>
        <StyledView className='flex justify-between items-left self-stretch px-6 py-3'>
          <StyledView className='flex flex-row'>
            <StyledText>Your Portfolio</StyledText>
            <StyledView className='items-right justify-right'>
              <StyledImage
                source={require('../../assets/images/settings.png')}
                className='w-[6vw] h-[6vw]'
              ></StyledImage>
            </StyledView>
          </StyledView>
        </StyledView>
        <PortfolioDetails></PortfolioDetails>
        <StyledView className='flex w-53 h-39 p-[7px_24px] flex-col items-center gap-2.5 shrink-0 rounded-[27px] bg-white'>
          <StyledText className='font-sourceSans3BodyBold'>Your Positions</StyledText>
        </StyledView>
        <StyledView className='flex w-98 p-[16px_24px] flex-col items-start gap-3 rounded-[27px] bg-white'>
          <UpdateCard topText='931 1st Street' bottomText='You invested $200' quantity='+$200.00' />
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
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
}
