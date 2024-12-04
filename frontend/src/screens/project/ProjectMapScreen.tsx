import React from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';
import MapView, { Marker } from 'react-native-maps';

interface ProjectMapScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledMapView = styled(MapView);

export default function ProjectMapScreen({ navigation, route }) {
  const { project, isLoading } = useProject(route.params.projectId);

  console.log(route.params.projectId)
  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

  const mapRegion = {
    latitude: project.latitude,
    longitude: project.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <StyledMapView className='w-full h-full' initialRegion={mapRegion}>
      <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
    </StyledMapView>
  );
}
