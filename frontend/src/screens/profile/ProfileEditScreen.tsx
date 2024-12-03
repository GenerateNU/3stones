import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';

import Divider from '../../components/Divider';
import Button from '../../components/Button';
import { BodyText, SubheadingText } from '../../components/typography';
import { useInvestorProfile } from '../../services/investor';
import ProfiileHeaderNavigation from './components/PageHeaderNavigation';
import PageHeaderNavigation from './components/PageHeaderNavigation';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface ProfileLegalDocumentsScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

const ProfileInfo = () => {
    const { profile, isLoading } = useInvestorProfile();
    if(isLoading) {
        return <StyledText>loading...</StyledText>
    }
    if(!profile) {
        return <StyledText>no profile found!</StyledText>
    }
    return (
        <StyledView className='flex flex-col px-[4vh] space-y-[25vh]'>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView>
                    <BodyText className='text-xl font-semibold'>Contact Details</BodyText>
                </StyledView>
                <StyledView className='flex flex-col space-y-[2vh]'>
                    <StyledView className='flex-row justify-between'>
                        <BodyText className='text-lg text-disabledText'>Name</BodyText>
                        <BodyText className='text-lg text-defaultPrimary'>{profile.first} {profile.last}</BodyText>
                    </StyledView>
                    <StyledView>
                    <Divider/>
                    </StyledView>
                    <StyledView className='flex-row justify-between'>
                        <BodyText className='text-lg text-disabledText'>Email</BodyText>
                        <BodyText className='text-lg text-defaultPrimary'>{profile.email}</BodyText>
                    </StyledView>
                    <StyledView>
                    <Divider/>
                    </StyledView>
                    <StyledView className='flex-row justify-between'>
                        <BodyText className='text-lg text-disabledText'>Mobile</BodyText>
                        <BodyText className='text-lg text-defaultPrimary'>{profile.phone_number}</BodyText>
                    </StyledView>
                    <StyledView>
                    <Divider/>
                    </StyledView>
                    <StyledView className='flex-row justify-between'>
                        <BodyText className='text-lg text-disabledText'>Mailing Address</BodyText>
                        <BodyText className='text-lg text-defaultPrimary'>{profile.premise} {profile.street}</BodyText>
                    </StyledView>
                    <StyledView>
                    <Divider/>
                    </StyledView>
                    <StyledView className='flex-row justify-between'>
                        <BodyText className='text-lg text-disabledText'>Social Security</BodyText>
                        <BodyText className='text-lg text-defaultPrimary'>*** **** *****</BodyText>
                    </StyledView>
                </StyledView>
        </StyledView>
    );
};

export default function ProfileEditScreen({ navigation }: ProfileLegalDocumentsScreenProps) {
    return(
        <StyledView className='flex h-screen py-[4vh] bg-surfaceBG'> 
            <StyledView className='py-[2vh] px-[4vw]'>
                <PageHeaderNavigation leftIconRoute={require('../../../assets/images/left-arrow.png')} navigation={navigation} navigationName = 'profile' pageName='Edit Profile'/>
            </StyledView>
            <StyledView className="flex px-[vw] py-[2vh] flex-col items-center space-y-[10vh]">
                <StyledView>
                    <StyledImage className="w-[10vh] h-[10vh] rounded-full" resizeMode='cover' source={require('../../../assets/images/PlaceHolderPFP.png')}/>
                </StyledView>
                <StyledView>
                    <Button onPress={() => {navigation.navigate('profile-edit')}} type='secondary'>Change Image</Button>
                </StyledView>
            </StyledView>
            <ProfileInfo/>
        </StyledView>
    );
}