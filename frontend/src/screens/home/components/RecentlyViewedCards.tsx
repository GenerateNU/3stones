import React from 'react';
import { Text, View, Image } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import StatusButton from './ProjectStatus';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const RecentlyViewedCard = ({ image, street, city, developmentType, amount, fundingGoal, status }) => {
  return (
    <Card className='w-[full] h-[20vh] flex flex-col justify-center items-center border-borderPrimary'>
      <StyledView className='flex flex-row flex-1'>
        <StyledView className="flex-1 ]">
            <StyledText className="text-[5vw] font-sourceSans3Bold">
                {street}
            </StyledText>
            <StyledText className="text-[3vw] font-sourceSans3 ">
                {city}
            </StyledText>
            <StyledText className="text-[3vw] font-sourceSans3 mt-[0.75vh]">
                {developmentType}
            </StyledText>

            <StatusButton>{status}</StatusButton>

        </StyledView>

        <StyledImage source={{ uri: image }} className='w-[30vw] h-[30vw] flex-2'></StyledImage>
      </StyledView>
      <StyledView className="w-full h-[2vh] flex-2 flex py-[1vh]">
        <ProgressBar current={amount} total={fundingGoal} />
      </StyledView>
    </Card>
  );
};

export default RecentlyViewedCard;
