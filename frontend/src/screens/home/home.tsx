import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import styles from './styles';

interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      {/* Some dummy image */}
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
      </View>
      {/* Some dummy button */}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
          <View>
            <Text style={styles.textStyle}>Dummy page</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
