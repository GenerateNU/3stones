import React from 'react';
import { Text, View, Image } from 'react-native';
import { styled } from 'nativewind';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import StatusTag from '../components/StatusTag';
import { useProject, useProjectTotalFunded } from '../../../services/project';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

// Card component for recently viewed Projects
const RecentlyViewedCard = ({ projectId }: { projectId: string }) => {
  // Get project data
  const { project, isLoading } = useProject(projectId);

  // Get total project funding
  const totalFunding = useProjectTotalFunded(projectId);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

  // recently viewed card tag
  const CardTag = () => {
    let iconRoute;
    if (project.milestone === 'Sold') {
      iconRoute = require('../../../../assets/images/celebration.png');
    } else if (project.milestone === 'Funding') {
      iconRoute = require('../../../../assets/images/money-success.png');
    } else if (project.milestone === 'Construction Complete') {
      iconRoute = require('../../../../assets/images/house.png');
    } else if (project.milestone === 'Operational') {
      iconRoute = require('../../../../assets/images/maps_home_work.png');
    } else if (project.milestone === 'Construction Started') {
      iconRoute = require('../../../../assets/images/handyman.png');
    } else if (project.milestone === 'Permitting Secured') {
      iconRoute = require('../../../../assets/images/topic.png');
    } else if (project.milestone === 'Design Complete') {
      iconRoute = require('../../../../assets/images/design_services.png');
    } else {
      iconRoute = require('../../../../assets/images/landscape.png');
    }

    let intent: 'InProgressGreen' | 'InProgressNeutral' | 'Sold' | 'Funding' | undefined;
    if (project.milestone === 'Sold') {
      intent = 'Sold';
    } else if (project.milestone === 'Funding') {
      intent = 'Funding';
    } else if (
      project.milestone === 'Construction Complete' ||
      project.milestone === 'Operational'
    ) {
      intent = 'InProgressGreen';
    } else {
      intent = 'InProgressNeutral';
    }

    return (
      <StyledView className='flex-2 bottom-0'>
        <StatusTag
          name={project.milestone}
          iconRoute={iconRoute}
          intent={intent ? intent : 'InProgressNeutral'}
        ></StatusTag>
      </StyledView>
    );
  };

  const ProjectInformation = () => {
    return (
      <StyledView className='flex-1'>
        <StyledText className='text-[5vw] font-sourceSans3Bold'>{project?.street}</StyledText>
        <StyledText className='text-[3vw] font-sourceSans3 '>
          {project?.locality}, {project?.state}{' '}
        </StyledText>
        <StyledText className='text-[3vw] font-sourceSans3 mt-[0.75vh]'>
          {project?.title}
        </StyledText>
      </StyledView>
    );
  };
  return (
    <Card className='w-full h-full flex flex-col justify-center items-center border-borderPrimary'>
      <StyledView className='flex flex-row flex-1 h-[15vh]'>
        <StyledView className='flex-1 flex-col '>
          <ProjectInformation />
          <CardTag />
        </StyledView>

        <StyledImage
          source={{ uri: project?.images[0]?.url }}
          className='flex-grow flex-2 rounded-md px-[2vw]'
        ></StyledImage>
      </StyledView>

      {project.milestone === 'Funding' && (
        <StyledView className='w-full h-[2vh] flex-2 flex py-[1vh] py-[2vh] '>
          <ProgressBar current={totalFunding} total={project?.funding_goal_cents} />
        </StyledView>
      )}
    </Card>
  );
};

export default RecentlyViewedCard;

{
  /* <Tag level={"neutralSubdued"}  className="h-[3.5vh] w-[4vw] font-sourceSans3 " icon={<StyledImage className="h-[4vw] w-[4vw]" source={iconRoute}></StyledImage>}>{status}</Tag> */
}
