import React from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';

interface ProjectInvestScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

export default function ProjectInvestScreen({ navigation }: ProjectInvestScreenProps) {
  return <Text>Invest screen</Text>;
}
