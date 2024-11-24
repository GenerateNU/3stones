import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';
import { useInvestorProfile } from '../../../src/services/investor'

import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { BodyBoldText, HeadingText, SubheadingText } from '../../components/typography';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface ProfileScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

//Button to navigate to the portfolio page
const EditProfileButton = ({ navigation }) => {
    return (
        <StyledView className='h-[4vh] w-[15vh]'>
            <Button onPress={() => {navigation.navigate('profile-edit-profile')}}
                type='secondary'
            >Edit Profile</Button>
        </StyledView>
    );
  };

  const UserName = () => {
    const { profile, isLoading } = useInvestorProfile();
    if(isLoading) {
        return <StyledText>loading...</StyledText>
    }
    if(!profile) {
        return <StyledText>no profile found!</StyledText>
    }
    return (
        <BodyBoldText className='text-lg'>{profile.first} {profile.last}</BodyBoldText>
    );
  };

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    return(
        <StyledView className='flex h-screen py-[6vh]'> 
            {/*Your Profile ...*/}
            <StyledView className="flex-row py-[2vh] px-[4vw] justify-between">
                <SubheadingText className='text-3xl font-semibold'>Your Profile</SubheadingText>
            </StyledView>
            <StyledView className="flex px-[vw] py-[2vh] flex-col items-center space-y-[10vh]">
                <StyledImage className="w-[12vh] h-[12vh] rounded-full" resizeMode='cover' source={require('../../../assets/images/PlaceHolderPFP.png')}/>
                <UserName/>
                <StyledText>
                </StyledText>
                <EditProfileButton navigation={navigation}/>
            </StyledView>
            <StyledView className='flex flex-col px-[4vh] space-y-[40vh]'>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView className='flex flex-col space-y-[20vh]'>
                    <StyledView>
                        <ProfilePageNavigator iconRoute={require('../../../assets/images/deposit-icon.png')} navigation={navigation} navigationName = 'profile-deposit' pageName='Deposit'/>
                    </StyledView>
                    <StyledView>
                        <ProfilePageNavigator iconRoute={require('../../../assets/images/withdraw-icon.png')} navigation={navigation} navigationName = 'profile-withdraw' pageName='Withdraw'/>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView className='flex flex-col space-y-[20vh]'>
                    <StyledView>
                        <ProfilePageNavigator iconRoute={require('../../../assets/images/settings-icon.png')} navigation={navigation} navigationName = 'profile-settings' pageName='Settings'/>
                    </StyledView>
                    <StyledView>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/document-icon.png')} navigation={navigation} navigationName = 'profile-legal-documents' pageName='Legal Documents'/>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <Divider/>
                </StyledView>
                <StyledView className='flex flex-col'>
                    <StyledView>
                        <ProfilePageNavigator iconRoute={require('../../../assets/images/risk-tolerance-icon.png')} navigation={navigation} navigationName = 'profile-risk-tolerance' pageName='Risk Tolerance'/>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}