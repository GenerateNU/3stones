import React from 'react';
import { Image, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledImage = styled(Image);

const searchIcon = require('../assets/images/search-icon.png');

// Get screen width and height
const { width, height } = Dimensions.get('window');

// Used styleSheet instead of Native wind due to the drop shadow not rendering on Native wind.
// Width and Height were used to determine viewport's width/height (responsive design)
const styles = StyleSheet.create({
  shadowSearchBar: {
    // 75vw and 5vh
    width: width * 0.75,
    height: height * 0.05,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.007,
    },
    borderRadius: width * 0.035,
    shadowOpacity: 0.25,
    shadowRadius: height * 0.006,
    //Drop shadow for android: for edit in the future if android drop shadow is incorrectly rendering this component.(elevation is an android specific property)
    elevation: height * 0.05,
    paddingLeft: width * 0.1,
    fontSize: width * 0.04,
    color: 'black',
    fontFamily: 'Inter',
  },
});

const searchBar = () => {
  //current text input
  const [input, setInput] = React.useState('');

  //function that updates input while searching
  function onChangeInput(text) {
    setInput(text);
    console.log('Input: ', text);
  }

  //function that handles search submission
  function onSubmitInput() {
    console.log('Submitted: ', input);
  }

  return (
    <StyledView className='flex-inline justify-center'>
      <StyledImage source={searchIcon} className='absolute w-[4vw] h-[2vh] left-[4vw] z-20' />
      <TextInput
        onChangeText={onChangeInput}
        value={input}
        onSubmitEditing={onSubmitInput}
        placeholder='Search'
        placeholderTextColor='#5E5E5E'
        style={styles.shadowSearchBar}
      />
    </StyledView>
  );
};

export default searchBar;
