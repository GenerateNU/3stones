import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { useContributorById } from '../../services/contributor';

type ParamList = {
  mt: {
    id: string;
  };
};

export default function ContributorsScreen() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { id } = route.params;
  const {
    contributor,
    contributorIsLoading
  } = useContributorById(id);

  if (contributorIsLoading)
    return (
      <View>
        <Text>Loading Contributor...</Text>
      </View>
    );

  if (!contributor || contributor == undefined) {
    <View>
      <Text>Error Loading Contributor</Text>
    </View>;
  }

  return (
    <View>
        <Text>{contributor.firstName} {contributor.lastName}</Text>
    </View>
  );
}