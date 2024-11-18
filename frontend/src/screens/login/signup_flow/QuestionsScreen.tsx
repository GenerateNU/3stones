import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { useAuth } from '../../../context/AuthContext'; // Import AuthContext

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function QuestionsScreen({ navigation }) {
    const { signupData, updateSignupData } = useAuth(); // Use AuthContext to manage signup data
    const questions = [
        {
            id: 1,
            text: 'When making a long-term investment, I plan to keep the money invested for...',
            type: 'single',
            options: ['1 - 2 years', '3 - 4 years', '5 - 6 years', 'More than 6 years'],
        },
        {
            id: 2,
            text: 'When it comes to investing in stocks I would describe myself as...',
            type: 'single',
            options: ['Inexperienced', 'Somewhat inexperienced', 'Somewhat experienced', 'Experienced'],
        },
        {
            id: 3,
            text: 'My current and future income sources are...',
            type: 'single',
            options: ['Unstable', 'Somewhat stable', 'Stable', 'Very stable'],
        },
        {
            id: 4,
            text: 'Select the type of real estate investments that interest you...',
            type: 'multiple',
            options: ['Commercial Real Estate', 'Residential Real Estate', 'Development Real Estate', 'Land Speculation'],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = questions[currentIndex];

    const handleSelectOption = (selectedOptions) => {
        // Update answers in AuthContext
        updateSignupData(`questions.${currentQuestion.id}`, selectedOptions);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('DummyDone');
        }
    };

    const handleSaveForLater = () => {
        navigation.navigate('DummyDone');
    };

    return (
        <StyledKeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">

                    {/* Progress Bar */}
                    <StyledView className="w-full mb-4">
                        <ProgressBar current={currentIndex + 1} total={questions.length} />
                    </StyledView>

                    {/* User Details Input Section */}
                    <StyledView className="w-full flex-1 justify-center items-center">
                        <StyledText className="text-center text-2xl font-bold text-black mb-2">Last but not least!</StyledText>
                        <StyledText className="text-center text-gray-600 mb-8">
                            Take a second to answer questions to better understand you as an investor.
                        </StyledText>
                    </StyledView>

                    {/* Question cards */}
                    <QuestionCard
                        question={currentQuestion}
                        selectedAnswers={signupData.questions[currentQuestion.id] || []}
                        onSelectOption={handleSelectOption}
                        currentIndex={currentIndex}
                        totalQuestions={questions.length}
                    />

                    {/* Continue Button */}
                    <StyledView className="w-full mt-6">
                        <Button type="plain-dark" onPress={handleSaveForLater}>
                            Save for Later
                        </Button>
                        <Button type="primary" onPress={handleNext}>
                            Next
                        </Button>
                    </StyledView>

                </StyledView>
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
}
