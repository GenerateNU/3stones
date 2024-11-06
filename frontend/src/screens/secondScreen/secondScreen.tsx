import React from 'react';
import { GestureResponderEvent, Text, View } from 'react-native';
import styles from './styles';
import SearchBar from '../../components/SearchBar';

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Another screen!</Text>
      </View>
      <SearchBar
        value='Search'
        onValueChange={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
        intent={'selected'}
        icon={'x-default'}
        textColor={'#282828'}
        onPressed={function (event: GestureResponderEvent): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SearchBar
        value='Search'
        onValueChange={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
        intent={'disabled'}
        icon={'x-disabled'}
        textColor={'#868686'}
        onPressed={function (event: GestureResponderEvent): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SearchBar
        value='Search'
        onValueChange={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
        intent={'unselected'}
        icon={'search-default'}
        textColor={'#BBBBBB'}
        onPressed={function (event: GestureResponderEvent): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SearchBar
        value='Search'
        onValueChange={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
        intent={'disabled'}
        icon={'search-disabled'}
        textColor={'#868686'}
        onPressed={function (event: GestureResponderEvent): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
}
