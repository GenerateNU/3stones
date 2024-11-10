import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from '../../../components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';
import styles from './styles';
import NotificationButton from '../../../components/NotificationButton';
import WideButton from '../../components/WideButton';

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
            <WideButton
                name={'Edit Profile'}
                navigation={navigation}
                intent='secondary'
            ></WideButton>
        </StyledView>
    );
  };

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    return(
        <StyledView className='flex h-screen py-[6vh]'> 
            {/*Your Profile ...*/}
            <StyledView className="flex-row py-[2vh] px-[4vw] justify-between">
                <StyledText className="text-3xl align-center font-Nunito-BoldItalic text-center">
                    Your Profile
                </StyledText>
                <NotificationButton navigation={navigation} onPress = {() => {}}/>
            </StyledView>
            <StyledView className="flex px-[vw] py-[2vh] flex-col items-center space-y-[10vh]">
                <StyledImage source={require('../../../assets/images/PlaceHolderPFP.png')} style={styles.imageStyle} />
                <StyledText>
                    Your Name
                </StyledText>
                <StyledText>
                    yourname@gmail.com
                </StyledText>
                <EditProfileButton navigation={navigation}/>
            </StyledView>
            <StyledView className='flex flex-col space-y-[32vw]'>
                <StyledImage source={require('../../../assets/images/grey-line-spacer.png')}/>
                <StyledView className='flex flex-col gap-y-[40vh]'>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/settings-icon.png')} navigation={navigation} pageName='Settings'/>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/document-icon.png')} navigation={navigation} pageName='Legal Documents'/>
                </StyledView>
                <StyledImage source={require('../../../assets/images/grey-line-spacer.png')}/>
                <StyledView className='flex flex-col gap-y-[40vh]'>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/deposit-icon.png')} navigation={navigation} pageName='Deposit'/>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/withdraw-icon.png')} navigation={navigation} pageName='Withdraw'/>
                </StyledView>
                <StyledImage source={require('../../../assets/images/grey-line-spacer.png')}/>
                <StyledView className='flex flex-col gap-y-[40vh]'>
                    <ProfilePageNavigator iconRoute={require('../../../assets/images/risk-tolerance-icon.png')} navigation={navigation} pageName='Risk Tolerance'/>
                </StyledView>
                <StyledImage source={require('../../../assets/images/grey-line-spacer.png')}/>
            </StyledView>
        </StyledView>
    );
}