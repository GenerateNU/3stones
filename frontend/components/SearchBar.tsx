import React from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
// const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledImage = styled(Image);

const searchIcon = require('../assets/images/search-icon.png');


const searchBar = () => {
    function onChangeInput() {
        console.log('triggered');
    }
    return (
        <StyledView className="flex justify-center">
            <StyledImage source={searchIcon} className="absolute w-[4vw] h-[2vh]"/>
            <StyledTextInput onChangeText={onChangeInput} placeholder="Search" className='w-[75vw] h-[5vh] border-none rounded-r-[3vw] rounded-l-[3vw] placeholder:pl-[6vw] placeholder:text-[5vw]'></StyledTextInput>
        </StyledView>
    );
};


export default searchBar;