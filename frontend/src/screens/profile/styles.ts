import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  imageStyle: {
    height: height / 8,
    width: height/8,
    resizeMode: 'cover',
    borderRadius: height / 2,
  },
});