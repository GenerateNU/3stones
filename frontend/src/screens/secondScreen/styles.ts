import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    marginTop: height / 20,
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
