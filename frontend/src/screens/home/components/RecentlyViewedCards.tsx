import React from 'react';
import { Text, View, Image } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import StatusTag from './StatusTag';
import { useProject, useProjectTotalFunded } from '../../../services/project';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

// Card component for recently viewed Projects
const RecentlyViewedCard = ({
  image,
  street,
  city,
  developmentType,
  amount,
  fundingGoal,
  status,
  projectId
}: {
  image: string;
  street: string;
  city: string;
  developmentType: string;
  amount: number;
  fundingGoal: number;
  status: string;
  projectId: string;
}) => {

    // Get project data
    const { project, isLoading } = useProject(projectId);
    console.log(project);

    // Get total project funding
    const totalFunding = useProjectTotalFunded(projectId);  

  const parsedStatus = status.split(' ').join('');
  let Intent: 'InProgress' | 'Sold' | 'Funding' | undefined;
  if (parsedStatus === 'InProgress' || parsedStatus === 'Sold' || parsedStatus === 'Funding') {
    Intent = parsedStatus as 'InProgress' | 'Sold' | 'Funding';
  }

  // recently viewed card tag
  const Tag = ({ status, parsedStatus, intent }) => {
    let iconRoute;
    if (parsedStatus === 'Sold') {
      iconRoute = require('../../../../assets/images/celebration.png');
    } else if (parsedStatus === 'Funding') {
      iconRoute = require('../../../../assets/images/money-success.png');
    }
    //Default to InProgress
    else {
      iconRoute = require('../../../../assets/images/construction.png');
    }

    return (
      <StyledView className='flex-2 bottom-0 w-[27vw] h-[3.5vh]'>
        <StatusTag
          name={status}
          iconRoute={iconRoute}
          intent={intent ? intent : 'InProgress'}
        ></StatusTag>
      </StyledView>
    );
  };

  const ProjectInformation = () => {
    return (
      <StyledView className='flex-1'>
            <StyledText className='text-[5vw] font-sourceSans3Bold'>{project?.street}</StyledText>
            <StyledText className='text-[3vw] font-sourceSans3 '>{project?.locality}, {project?.state} </StyledText>
            <StyledText className='text-[3vw] font-sourceSans3 mt-[0.75vh]'>
              {project?.title}
            </StyledText>
          </StyledView>
    );
  };
  return (
    <Card className='w-full h-auto flex flex-col justify-center items-center border-borderPrimary'>
      <StyledView className='flex flex-row flex-1'>
        <StyledView className='flex-1 flex-col '>
          <ProjectInformation />
          <Tag status={status} parsedStatus={parsedStatus} intent={Intent} />
        </StyledView>
        
        <StyledImage
          source={{ uri: project?.images[0]?.url }}
          className='w-[32vw] h-[32vw] flex-2 rounded-md'
        ></StyledImage>
      </StyledView>

      {status === 'Funding' && (
        <StyledView className='w-full h-[2vh] flex-2 flex py-[1vh] py-[2vh] '>
          <ProgressBar current={totalFunding} total={project?.funding_goal_cents} />
        </StyledView>
      )} 
    </Card>
  );
};

export default RecentlyViewedCard;
