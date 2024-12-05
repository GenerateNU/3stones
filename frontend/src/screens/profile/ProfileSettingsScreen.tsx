import React from 'react';
import { Image, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from './components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';

import Divider from '../../components/Divider';
import { SubheadingText } from '../../components/Typography';
import PageHeaderNavigation from './components/PageHeaderNavigation';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface ProfileSettingsScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

interface ProfileSettingsPageNavigatorProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
  navigationName: string;
  pageName: string;
  //route to button's icon
  leftIconRoute?: ImageSourcePropType;
  rightIconRoute: ImageSourcePropType;
}

const ProfileSettingsPageNavigator = ({
  navigation,
  navigationName,
  pageName,
  leftIconRoute,
  rightIconRoute,
}: ProfileSettingsPageNavigatorProps) => {
  return (
    <StyledView className='border border-gray-200 rounded-lg px-[2vw] py-[1vh]'>
      <ProfilePageNavigator
        navigation={navigation}
        navigationName={navigationName}
        pageName={pageName}
        leftIconRoute={leftIconRoute}
        rightIconRoute={rightIconRoute}
      />
    </StyledView>
  );
};

export default function ProfileSettingsScreen({ navigation }: ProfileSettingsScreenProps) {
  return (
    <StyledView className='flex flex-col h-screen px-[4vw] py-[4vh] space-y-[20vh] bg-surfaceBG'>
      <StyledView className='py-[2vh]'>
        <PageHeaderNavigation
          leftIconRoute={require('../../../assets/images/left-arrow.png')}
          navigation={navigation}
          navigationName='profile'
          pageName='Settings'
        />
      </StyledView>
      <StyledView className='flex flex-col space-y-[25vh]'>
        <StyledView>
          <SubheadingText className='text-xl font-semibold'>Account Access</SubheadingText>
        </StyledView>
        <StyledView>
          <ProfileSettingsPageNavigator
            leftIconRoute={require('../../../assets/images/key-icon.png')}
            navigation={navigation}
            rightIconRoute={require('../../../assets/images/side-arrow.png')}
            navigationName='profile-settings-change-password'
            pageName='Change Password'
          />
        </StyledView>
      </StyledView>
      <StyledView className='flex flex-col space-y-[25vh]'>
        <StyledView>
          <SubheadingText className='text-xl font-semibold'>Preferences</SubheadingText>
        </StyledView>
        <StyledView className='flex flex-col space-y-[8vh]'>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigationName='profile-settings-language'
              pageName='Language'
            />
          </StyledView>
          <StyledView>
            {'Create component for toggleable Cookies, probably different than a Navigator'}
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/side-arrow.png')}
              navigationName='profile-settings-cookies'
              pageName='Cookies'
            />
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledView className='flex flex-col space-y-[25vh]'>
        <StyledView>
          <SubheadingText className='text-xl font-semibold'>Privacy</SubheadingText>
        </StyledView>
        <StyledView className='flex flex-col space-y-[8vh]'>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/link-icon.png')}
              navigationName='profile-settings-privacy-policy'
              pageName='Privacy Policy'
            />
          </StyledView>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/link-icon.png')}
              navigationName='profile-settings-privacy-policy'
              pageName='Cookie Disclosure'
            />
          </StyledView>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/link-icon.png')}
              navigationName='profile-settings-privacy-policy'
              pageName='Terms of Service'
            />
          </StyledView>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/link-icon.png')}
              navigationName='profile-settings-privacy-policy'
              pageName='User Agreement'
            />
          </StyledView>
          <StyledView>
            <ProfileSettingsPageNavigator
              navigation={navigation}
              rightIconRoute={require('../../../assets/images/link-icon.png')}
              navigationName='profile-settings-privacy-policy'
              pageName='Investment Disclaimer'
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
