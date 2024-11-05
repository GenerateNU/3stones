import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  imageStyle: {
    height: height / 4,
    resizeMode: 'contain',
    marginTop: height / 20,
    marginBottom: height / 20,
  },
});
