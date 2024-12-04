import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import SearchBar from '../../../components/SearchBar';
import logo from '../../../../assets/images/Logo x 100.png';
import { useSearchProjects } from '../../../services/project';
import RecentlyViewedCard from '../../home/components/RecentlyViewedCards';

interface ExploreScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any;
}

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

export default function SearchResults({ route, navigation }: ExploreScreenProps) {
  const { searchQuery } = route.params || '';
  console.log('searchQuery: ', searchQuery);
  const { projectResults, isLoading } = useSearchProjects(searchQuery);
  console.log(projectResults);

  return (
    <StyledScrollView className='flex-1 bg-surfaceBG'>
      {/* Explore Header */}
      <StyledView className='pt-[2vh] pl-[2vh]'>
        <StyledText className='text-[8vw] font-heading'>Explore</StyledText>
      </StyledView>

      {/* Search Bar */}
      <StyledView className='flex items-center'>
        <StyledTouchableOpacity
          className='pt-[2vh]'
          onPress={(evt) => {
            navigation.navigate('search');
          }}
        >
          <StyledTouchableOpacity
            className='pt-[2vh] absolute z-20 w-[100vw] h-[8vh]'
            onPress={(evt) => {
              navigation.navigate('search');
            }}
          ></StyledTouchableOpacity>

          <SearchBar
            intent='unselected'
            icon='search-default'
            value={searchQuery}
            width={90}
            height={5}
            onValueChange={() => {}}
            onPressed={(evt) => {
              navigation.navigate('search');
            }}
            textColor=''
            onSubmit={(evt) => {}}
          />
        </StyledTouchableOpacity>

        {/* Display Properties */}

        <StyledView className='w-[100vw] flex items-center justify-center overflow-scroll'>
          {projectResults.length > 0 ? (
            projectResults.map((project) => (
              <StyledTouchableOpacity
                onPress={() => navigation.navigate('Project')}
                key={project?.id}
                className='mt-[3vh] w-[90vw] h-[22vh]'
              >
                <RecentlyViewedCard projectId={project?.id} />
              </StyledTouchableOpacity>
            ))
          ) : (
            <StyledView className='w-[80vw] h-[30vh] mt-[6vh] flex items-center justify-center'>
              <StyledImage source={logo} className='w-[26vw] h-[30vw]' />
              <StyledText className='mt-[2vh] font-sourceSans3Bold text-[4vw]'>
                No results found for "{searchQuery}".
              </StyledText>
              <StyledText className='mt-[1vh] font-body text-[3w] flex text-center'>
                Try a new search or explore the categories to find what you are looking for.
              </StyledText>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}
