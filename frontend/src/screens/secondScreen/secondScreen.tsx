import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import SearchBar from '../../components/SearchBar';

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Another screen!</Text>
      </View>
      <SearchBar value='Search' onValueChange={function (text: string): void {
        throw new Error('Function not implemented.');
      } } intent={'selected'} icon={'clear'}/>
      <SearchBar value='Search' onValueChange={function (text: string): void {
        throw new Error('Function not implemented.');
      } } intent={'filled'} icon={'clear'}/>
      <SearchBar value='Search' onValueChange={function (text: string): void {
        throw new Error('Function not implemented.');
      } } intent={'unselected'} icon={'search'}/>
      <SearchBar value='Search' onValueChange={function (text: string): void {
        throw new Error('Function not implemented.');
      } } intent={'filled'} icon={'search'}/>
    </View>
  );
}
