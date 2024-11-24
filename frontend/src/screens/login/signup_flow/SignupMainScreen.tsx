import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import WelcomeToThreeStonesComponent from '../components/WelcomeToThreeStones';
import Divider from '../../../components/Divider';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';
import NavProgressBar from '../components/NavProgressBar';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignUpMainScreen({ navigation }) {
    const handleNext = () => {
        navigation.navigate('EmailInputScreen');
    };

    return (
        <OnboardingScreenWrapper>
            <NavProgressBar buttonType={'close'} onPress={() => navigation.goBack()} />

            {/* Header */}
            <WelcomeToThreeStonesComponent />

            <StyledText className="text-center text-gray-900 mb-8">
                Providing the tools you need to make your first investments in real estate.
            </StyledText>

            {/* Email Input Section */}
            <StyledView className="w-full justify-center mt-10">
                <Button
                    onPress={handleNext}>
                    Continue with Email
                </Button>

                <Divider text='OR' />

                {/* Google and Apple Sign-In Buttons (Stub) */}
                <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
                    <StyledText className="text-gray-500">Sign in with Google</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
                    <StyledText className="text-gray-500">Sign in with Apple</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </OnboardingScreenWrapper>
    );
}
