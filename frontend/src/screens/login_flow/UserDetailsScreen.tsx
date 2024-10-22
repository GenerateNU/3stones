import React from 'react';
import { Image, View, Text } from 'react-native';
import { styled } from 'nativewind';
import ButtonComponent from '../../components/ButtonComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import TextInputComponent from '../../components/TextInputComponent';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function UserDetailsScreen({ navigation }) {
    return (
        <StyledView className="flex-1 items-center bg-surfaceBG p-6">
            <ProgressBarComponent
                currentStep={3}
                totalSteps={6}
                showBack={false}
                showClose={true}
                onPress={() => navigation.navigate('PasswordInputScreen')} />
            <StyledText className="text-center text-2xl font-bold text-black mb-2">A bit about you</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
                We need your first and last name to get started.
            </StyledText>

            <TextInputComponent
                placeholder="First Name"
                value=""
                onChangeText={() => { }}
                isPassword={false}
            ></TextInputComponent>

            <TextInputComponent
                placeholder="Last Name"
                value=""
                onChangeText={() => { }}
                isPassword={false}
            ></TextInputComponent>


            <ButtonComponent
                title="Continue"
                theme="primary"
                onPress={() => navigation.navigate('ConnectAccountsScreen')}
                disabled={false}
            />
        </StyledView>
    );
}

