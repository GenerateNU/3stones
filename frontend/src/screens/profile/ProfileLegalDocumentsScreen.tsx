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
        <StyledView className='flex h-screen py-[4vh] bg-surfaceBG'> 
            <StyledView className='flex flex-col px-[4vh] space-y-[20vh]'>
                <StyledView className='flex flex-col space-y-[10vh]'>
                    <StyledView>
                    <ProfilePageNavigator navigation={navigation} rightIconRoute={require('../../../assets/images/side-arrow.png')} navigationName = 'legal-documents-terms-of-service' pageName='Terms of Service'/>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView className='flex flex-col space-y-[10vh]'>
                    <StyledView>
                        <ProfilePageNavigator navigation={navigation} rightIconRoute={require('../../../assets/images/side-arrow.png')} navigationName = 'legal-documents-user-agreement' pageName='User Agreement'/>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView className='flex flex-col space-y-[10vh]'>
                    <StyledView>
                        <ProfilePageNavigator navigation={navigation} rightIconRoute={require('../../../assets/images/side-arrow.png')} navigationName = 'legal-documents-investment-disclaimer' pageName='Investment Disclaimer'/>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <Divider/>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}