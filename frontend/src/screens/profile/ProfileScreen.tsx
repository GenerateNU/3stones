import React from 'react';
import { Image, Text, View } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';
import { useInvestorProfile } from '../../../src/services/investor';

import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { BodyBoldText, BodyText, SubheadingText } from '../../components/Typography';

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
    <StyledView className='h-[4vh] w-[20vh]'>
      <Button
        onPress={() => {
          navigation.navigate('profile-edit');
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
    <BodyBoldText className='text-lg'>
      {profile.first} {profile.last}
    </BodyBoldText>
  );
};

const Email = () => {
  const { profile, isLoading } = useInvestorProfile();
  if (isLoading) {
    return <StyledText>loading...</StyledText>;
  }
  if (!profile) {
    return <StyledText>no profile found!</StyledText>;
  }
  return <BodyText>{profile.email}</BodyText>;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <StyledView className='flex h-screen py-[6vh] bg-surfaceBG'>
      {/*Your Profile ...*/}
      <StyledView className='flex-row py-[2vh] px-[4vw] justify-between'>
        <SubheadingText className='text-3xl font-semibold'>Your Profile</SubheadingText>
      </StyledView>
      <StyledView className='flex px-[vw] py-[2vh] flex-col items-center space-y-[5vh]'>
        <StyledImage
          className='w-[10vh] h-[10vh] rounded-full'
          resizeMode='cover'
          source={require('../../../assets/images/PlaceHolderPFP.png')}
        />
        <StyledView>
          <UserName />
        </StyledView>
        <StyledView>
          <Email />
        </StyledView>
        <StyledView>
          <EditProfileButton navigation={navigation} />
        </StyledView>
      </StyledView>
      <StyledView className='flex flex-col px-[4vh] space-y-[25vh]'>
        <StyledView>
          <Divider />
        </StyledView>
        <StyledView className='flex flex-col space-y-[20vh]'>
          <StyledView>
            <ProfilePageNavigator
              leftIconRoute={require('../../../assets/images/deposit-icon.png')}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigation={navigation}
              navigationName='profile-transaction'
              pageName='Deposit'
              navigationParams={{ withdraw: false }} // Pass withdraw as false
            />
          </StyledView>
          <StyledView>
            <ProfilePageNavigator
              leftIconRoute={require('../../../assets/images/withdraw-icon.png')}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigation={navigation}
              navigationName='profile-transaction'
              pageName='Withdraw'
              navigationParams={{ withdraw: true }} // Pass withdraw as true
            />
          </StyledView>
        </StyledView>
        <StyledView>
          <Divider />
        </StyledView>
        <StyledView className='flex flex-col space-y-[20vh]'>
          <StyledView>
            <ProfilePageNavigator
              leftIconRoute={require('../../../assets/images/settings-icon.png')}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigation={navigation}
              navigationName='profile-settings'
              pageName='Settings'
            />
          </StyledView>
          <StyledView>
            <ProfilePageNavigator
              leftIconRoute={require('../../../assets/images/document-icon.png')}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigation={navigation}
              navigationName='profile-legal-documents'
              pageName='Legal Documents'
            />
          </StyledView>
        </StyledView>
        <StyledView>
          <Divider />
        </StyledView>
        <StyledView className='flex flex-col'>
          <StyledView>
            <ProfilePageNavigator
              leftIconRoute={require('../../../assets/images/risk-tolerance-icon.png')}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigation={navigation}
              navigationName='profile-risk-tolerance'
              pageName='Risk Tolerance'
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
