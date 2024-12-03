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
            </StyledView>
        </OnboardingScreenWrapper>
    );
}
