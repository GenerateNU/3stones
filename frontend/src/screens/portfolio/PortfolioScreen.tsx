//Change loading page and if a portfolio cant be loaded page
import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native';
import PortfolioItem from './components/PortfolioItem';
import PortfolioDetails from './components/PortfolioDetails';
import UpdateCard from './components/PortfolioUpdateCard';
import { useInvestorPortfolio } from '../../../src/services/investor'
import { useAuth } from "../../../src/context/AuthContext";
import { useProjectTotalFunded, useAllProjects, useProjectPosts } from "../../services/project";



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

  const { portfolio, isLoading: portfolioLoading } = useInvestorPortfolio();
  const { allProjects, isLoading: projectsLoading } = useAllProjects();

  if (portfolioLoading || projectsLoading) {
    return <StyledText className='text-lg font-bold'>Loading...</StyledText>;
  }

  if (!portfolio) {
    return <StyledText>Failed to load portfolio. Please try again later.</StyledText>;
  }

  if (!allProjects || allProjects.length === 0) {
    return <StyledText>No projects found.</StyledText>;
  }

  return (
    <StyledView className='flex-1 justify-center bg-surfaceBG overflow-auto'>
      
      {/* Padding */}
      <StyledView className='flex w-93 h-14 items-center shrink-0'></StyledView>

      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex-1'>
        <StyledView className='flex justify-between items-left self-stretch px-6 py-3'>
          <StyledView className='flex flex-row justify-between'>
            <StyledText className = 'font-heading text-[24px]'>Your Portfolio</StyledText>
            <StyledView className='items-right justify-right'>
              <StyledImage
                source={require('../../../assets/images/settings.png')}
                className='w-[6vw] h-[6vw]'
              ></StyledImage>
            </StyledView>
          </StyledView>
        </StyledView>
        
        <PortfolioDetails></PortfolioDetails>

        {/* Tab section */}
        <StyledView className='w-full flex-row justify-center'>
          <StyledView className = 'w-40'>
              <StyledTouchableOpacity onPress={() => setActiveTab('Your Projects')} className={`items-center h-14 py-2 rounded-tr-[27px] rounded-tl-[27px] ${activeTab === 'Your Projects' ? 'bg-white' : 'bg-defaultPrimary'}`}>
                <StyledText className={`text-lg font-bold  ${activeTab === 'Your Projects' ? 'text-gray-800' : 'text-white'}`}>
                  Your Projects
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            {/* {activeTab === 'Updates' ? (
              <StyledImage className = 'h-14 w-10 z=1'
                source={require('../../../assets/images/Tab2.png')}
              />
              ) : <StyledImage className = 'h-14 z=1'
              source={require('../../../assets/images/Tab1.png')}
            />} */}
            <StyledView className = 'w-40'>
              <StyledTouchableOpacity onPress={() => setActiveTab('Updates')} className={`items-center h-14 py-2  rounded-tr-[27px] ${activeTab === 'Updates' ? 'bg-white' : 'bg-defaultPrimary'}`}>
                <StyledText className={`text-lg font-bold ${ activeTab === 'Updates' ? 'text-gray-800' : 'text-white'}`}>
                  Updates
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
        </StyledView>

       
        {/*Your Projects*/}
        {activeTab === 'Your Projects' ? (
        <StyledView className = 'bg-defaultPrimary'>
        <StyledView className= {`flex p-[16px] flex-col items-start bg-white ${activeTab === 'Your Projects' ? 'rounded-tr-[27px]' : 'rounded-tl-[27px]'}`}>
          <StyledText className='font-sourceSans3CaptionMedium text-[14px] mb-4'>
          {allProjects.length} Total Investments
        </StyledText>
            {allProjects.map((project) => (
              <StyledView className = 'mb-4'>
                <PortfolioItem
                  address={project.street}
                  location={project.state}
                  price={project.funding_goal_cents/100}
                  duration={''}
                  invested={-1}
                  completion={useProjectTotalFunded(project.id).projectTotalFunded}
                  image={<Image key={project.images[0].id} src={project.images[0].url} alt="Project Image" />}
                ></PortfolioItem>
              </StyledView>))}
        </StyledView>
       </StyledView>
        
        ) 
      : 
        (<StyledView className = 'bg-defaultPrimary'>
        <StyledView className={`flex p-[16px] flex-col items-start bg-white ${activeTab === 'Updates' ? 'rounded-tl-[27px]' : 'rounded-tr-[27px]'}`}>
          {/* Updates */}
          {allProjects.flatMap(project => {
                const { projectPosts = [] } = useProjectPosts(project.id) ?? {};
                return projectPosts.map((post) => (
                  <StyledView key={post.id} className="mb-2">
                    <UpdateCard topText={post.title} bottomText={post.description} quantity={''} />
                  </StyledView>
                ));
              })}
        </StyledView>
        </StyledView>
          )}
      </StyledScrollView>
    </StyledView>
  );
};
