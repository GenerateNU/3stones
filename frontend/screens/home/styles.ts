import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get("window").height;

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    imageContainer: {
        alignItems: 'center',
    },

    imageStyle: {
        height: height / 4,
        resizeMode: 'contain',
        marginTop: height / 20,
        marginBottom: height / 20,
    },

    textStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
  });