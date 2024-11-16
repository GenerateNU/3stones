import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext'; // Update import path based on where AuthContext is stored
import WelcomeToThreeStonesComponent from '../components/WelcomeToThreeStones';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignUpMainScreen({ navigation }) {
    const handleNext = () => {
        navigation.navigate('EmailInputScreen');
    };

    return (
        <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
            <StyledView className="flex-1 items-center bg-white p-6">

                {/* Header */}
                <WelcomeToThreeStonesComponent />

                <StyledText className="text-center text-gray-600 mb-8">
                    Providing the tools you need to make your first investments in real estate.
                </StyledText>

                {/* Email Input Section */}
                <StyledView className="w-full justify-center mt-10">
                    <Button
                        onPress={handleNext}>
                        Continue with Email
                    </Button>

                    {/* OR Separator */}
                    <StyledView className="w-full flex-row items-center my-4">
                        <StyledView className="flex-1 h-px bg-gray-300" />
                        <StyledText className="px-4 text-gray-500">OR</StyledText>
                        <StyledView className="flex-1 h-px bg-gray-300" />
                    </StyledView>

                    {/* Google and Apple Sign-In Buttons (Stub) */}
                    <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
                        <StyledText className="text-gray-500">Sign in with Google</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="w-full h-12 border border-gray-300 rounded-md flex-row items-center justify-center mb-4">
                        <StyledText className="text-gray-500">Sign in with Apple</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}
