import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';

import Divider from '../../components/Divider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface ProfileLegalDocumentsScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

export default function ProfileLegalDocumentsScreen({ navigation }: ProfileLegalDocumentsScreenProps) {
    return(
        <StyledView className='flex h-screen py-[6vh]'> 
            <StyledView className='flex flex-col space-y-[32vw]'>
                <Divider/>
                <StyledView className='flex flex-col gap-y-[40vh]'>
                <ProfilePageNavigator navigation={navigation} navigationName = 'legal-documents-terms-of-service' pageName='Terms of Service'/>
                </StyledView>
                <Divider/>
                <StyledView className='flex flex-col'>
                <ProfilePageNavigator navigation={navigation} navigationName = 'legal-documents-user-agreement' pageName='User Agreement'/>
                </StyledView>
                <Divider/>
                <StyledView className='flex flex-col'>
                    <ProfilePageNavigator navigation={navigation} navigationName = 'legal-documents-investment-disclaimer' pageName='Investment Disclaimer'/>
                </StyledView>
                <Divider/>
            </StyledView>
        </StyledView>
    );
}