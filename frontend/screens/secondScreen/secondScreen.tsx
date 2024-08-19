import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';

export default function SecondScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Another screen!</Text>
        </View>
      </View>
    );
}