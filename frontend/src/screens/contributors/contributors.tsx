import React from 'react';
import { Text, View } from 'react-native';

import { useAllContributors } from '../../services/contributor';
import { Contributor } from '../../types/contributor';

export default function ContributorsScreen() {
  const { contributors, contributorsAreLoading } = useAllContributors();

  if (contributorsAreLoading) {
    return (
      <View>
        <Text>Loading Contributors...</Text>
      </View>
    );
  }

  if (!contributors || contributors === undefined) {
    <View>
      <Text>Error Loading Contributors</Text>
    </View>;
  }

  const contributorObjects: Contributor[] = contributors.data.map(
    // Disable the linter checking for camelcase since these come from the database which is snake_case
    // eslint-disable-next-line camelcase
    (id: string, first_name: string, last_name: string, email: string) => {
      // Disable the linter checking for camelcase since these come from the database which is snake_case
      // eslint-disable-next-line camelcase
      return { id, first_name, last_name, email };
    },
  );

  return (
    <View>
      {contributorObjects.map((contributor) => (
        <Text key={contributor.id}>
          {contributor.firstName} {contributor.lastName}, {contributor.email}
        </Text>
      ))}
    </View>
  );
}
