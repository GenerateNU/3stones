import React, { useRef } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  DimensionValue,
  ScrollView,
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Tag from '../../components/Tag';
import { useNavigation } from '@react-navigation/native';


const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledMapView = styled(MapView);


export default function ProjectScreen({ navigation, route }) {
  const projectId: string = route.params.projectId
  const { project, isLoading } = useProject(projectId);
  const { projectTotalFunded, isLoading: isProjectTotalFundedLoading } = useProjectTotalFunded(
    projectId,
  );

  if (isLoading || isProjectTotalFundedLoading) {
    return <Text>Loading ...</Text>;
  }

  const firstTitle = `${project.premise} ${project.street}`;
  const secondTitle = `${project.locality}, ${project.state}`;

  const formatCents = (x: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(x / 100);
  };

  const fundingProgress: DimensionValue =
    `${(projectTotalFunded / project.funding_goal_cents).toFixed(0)}%` as DimensionValue;

  const propertyDetails = [
    ['Property Type', 'Residential'],
    ['Investment Strategy', 'Value-Add'],
    ['Investment Type', 'Equity'],
    ['Estimated First Distribution', '8/2025'],
    ['Estimated Hold Period', '20 Months'],
  ];

  const numberOfImages = project.images.length;
  const imageButtonText = numberOfImages > 20 ? '20+ Images' : `${numberOfImages} Images`;
  const mapRegion = {
    latitude: project.latitude,
    longitude: project.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };


  return (
      <StyledView className='flex-1'>
        <StyledScrollView
          className='flex-1 bg-surfaceBG text-defaultText'
          contentContainerStyle={{ alignItems: 'stretch' }}
        >
          <StyledView className="p-6">
            <StyledTouchableOpacity
              className='flex flex-row h-32 w-full'
              onPress={(evt) => {
                navigation.navigate('project-images', { projectId: projectId });
              }}
            >
              <StyledView className='flex-grow bg-red-100 mr-2'>
                <StyledImage
                  source={{ uri: project.images[0 % numberOfImages].url }} // replace with your image link
                  className='flex-1 object-cover rounded '
                  resizeMode='cover'
                />
              </StyledView>
                <StyledView className='flex flex-col flex-grow ml-2'>
                <StyledImage
                  source={{ uri: project.images[1 % numberOfImages].url }} // replace with your image link
                  className='flex-1 object-cover mb-2 rounded'
                  resizeMode='cover'
                />
                <StyledView className='flex-1 object-cover mt-2 rounded bg-green-500'>
                  <StyledImage
                    source={{ uri: project.images[2 % numberOfImages].url }} // replace with your image link
                    className='w-full h-full object-cover rounded'
                    resizeMode='cover'
                  />

                  <StyledView className='absolute inset-0 bg-gray-800 opacity-50 w-full h-full rounded' />

                  <StyledView className='absolute inset-0 flex items-center justify-center w-full h-full'>
                    <StyledText className='text-sm font-body' style={{ color: '#F3F3F3' }}>
                      {imageButtonText}
                    </StyledText>
                  </StyledView>
                </StyledView>
              </StyledView>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              className='my-6 h-16 w-full rounded overflow-hidden'
              onPress={(evt) => {
                navigation.navigate('project-map', { projectId: projectId });
              }}
            >
              <StyledMapView className='w-full h-full' initialRegion={mapRegion} scrollEnabled={false}>
                <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
              </StyledMapView>
            </StyledTouchableOpacity>
            <StyledText className='text-2xl font-heading leading-8'>{firstTitle}</StyledText>
            <StyledView className='flex flex-row justify-between'>
              <StyledText className='text-base leading-5 font-bodyBold'>{secondTitle}</StyledText>
              <Tag level="successSubdued">Funding</Tag>
            </StyledView>
            <StyledView className='my-4 bg-[#E8E8E8] h-1 rounded-full'>
              <StyledView
                className='bg-defaultPrimary h-full rounded-full'
                style={{ width: fundingProgress }}
              />
            </StyledView>
            <StyledView className='flex flex-row font-body text-defaultText text-xs leading-3 mb-6'>
              <StyledText className='flex-1'>
                Raised: {isProjectTotalFundedLoading ? 'Loading...' : formatCents(projectTotalFunded)}
              </StyledText>
              <StyledText className='flex-1 text-right'>
                Goal: {formatCents(project.funding_goal_cents)}
              </StyledText>
            </StyledView>
          </StyledView>
          
          <Card className='p-8'>
            <StyledText className='text-defaultText font-heading text-lg leading-6'>
              Description
            </StyledText>

            <StyledText className='font-sourceSans3 text-base leading-5 py-6'>{project.description}</StyledText>

            <StyledText className='text-defaultText font-heading text-lg leading-6'>
              Details
            </StyledText>

            <StyledView className='flex flex-col gap-y-2 py-6'>
              {propertyDetails.map((val, idx, arr) => (
                <StyledView className='flex flex-row justify-between'>
                  <StyledText className='font-heading text-base'>{val[0]}</StyledText>
                  <StyledText className='font-body text-base'>{val[1]}</StyledText>
                </StyledView>
              ))}
            </StyledView>
          </Card>
        </StyledScrollView>

        <StyledView className='w-full px-6 py-6 absolute bottom-0'>
          <Button 
            className="w-full" 
            type="primary" 
            onPress={() => { navigation.navigate("project-invest", {projectId: projectId})}}
          >
            Invest
          </Button>
        </StyledView>

      </StyledView>
  );
}
