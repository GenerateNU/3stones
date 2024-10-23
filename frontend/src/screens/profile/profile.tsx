import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ProfilePageNavigator from '../../../components/ProfilePageNavigator';
import { NavigationScreenProp } from 'react-navigation';
import styles from './styles';

const StyledView = styled(View);
const StyledText = styled(Text);

interface ProfileScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
  }

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    return(
        <StyledView className='flex h-screen py-[6vh] bg-green-500'> 
            {/*Your Profile ...*/}
            <StyledView className="flex justify-between items-end bg-blue-500">
                <StyledText className="text-lg font-bold text-center">
                    Your Profile
                </StyledText>
                {/*Round Button component*/}
            </StyledView>
            <StyledView className='bg-red-500'>
                <ProfilePageNavigator navigation={navigation} pageName='Settings'/>
                <ProfilePageNavigator navigation={navigation} pageName='Legal Documents'/>
                <ProfilePageNavigator navigation={navigation} pageName='Deposit'/>
                <ProfilePageNavigator navigation={navigation} pageName='Withdraw'/>
                <ProfilePageNavigator navigation={navigation} pageName='Risk Tolerance'/>
            </StyledView>
        </StyledView>
    );
}