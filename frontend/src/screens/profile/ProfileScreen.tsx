import React from 'react';
import { Image, Text, View } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';
import { useInvestorProfile } from '../../../src/services/investor';

import Button from '../../components/Button';
import Divider from '../../components/Divider';

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
      <Button
        onPress={() => {
          navigation.navigate('profile-edit-profile');
        }}
        type='secondary'
      >
        Edit Profile
      </Button>
    </StyledView>
  );
};

const UserName = () => {
  const { profile, isLoading } = useInvestorProfile();
  if (isLoading) {
    return <StyledText>loading...</StyledText>;
  }
  if (!profile) {
    return <StyledText>no profile found!</StyledText>;
  }
  return (
    <StyledText>
      {profile.first} {profile.last}
    </StyledText>
  );
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <StyledView className='flex h-screen py-[6vh]'>
      {/*Your Profile ...*/}
      <StyledView className='flex-row py-[2vh] px-[4vw] justify-between'>
        <StyledText className='text-3xl align-center font-Nunito-BoldItalic text-center'>
          Your Profile
        </StyledText>
      </StyledView>
      <StyledView className='flex px-[vw] py-[2vh] flex-col items-center space-y-[10vh]'>
        <StyledImage
          className='w-12 h-12'
          source={require('../../../assets/images/PlaceHolderPFP.png')}
        />
        <UserName />
        <StyledText></StyledText>
        <EditProfileButton navigation={navigation} />
      </StyledView>
      <StyledView className='flex flex-col space-y-[32vw]'>
        <Divider />
        <StyledView className='flex flex-col gap-y-[40vh]'>
          <ProfilePageNavigator
            iconRoute={require('../../../assets/images/deposit-icon.png')}
            navigation={navigation}
            navigationName='profile-transaction'
            pageName='Deposit'
            navigationParams={{ withdraw: false }} // Pass withdraw as false
          />
          <ProfilePageNavigator
            iconRoute={require('../../../assets/images/withdraw-icon.png')}
            navigation={navigation}
            navigationName='profile-transaction'
            pageName='Withdraw'
            navigationParams={{ withdraw: true }} // Pass withdraw as true
          />
        </StyledView>
        <Divider />
        <StyledView className='flex flex-col'>
          <ProfilePageNavigator
            iconRoute={require('../../../assets/images/settings-icon.png')}
            navigation={navigation}
            navigationName='profile-settings'
            pageName='Settings'
          />
          <ProfilePageNavigator
            iconRoute={require('../../../assets/images/document-icon.png')}
            navigation={navigation}
            navigationName='profile-legal-documents'
            pageName='Legal Documents'
          />
        </StyledView>
        <Divider />
        <StyledView className='flex flex-col'>
          <ProfilePageNavigator
            iconRoute={require('../../../assets/images/risk-tolerance-icon.png')}
            navigation={navigation}
            navigationName='profile-risk-tolerance'
            pageName='Risk Tolerance'
          />
        </StyledView>
        <Divider />
      </StyledView>
    </StyledView>
  );
}
