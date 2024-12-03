import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import NavProgressBar from '../components/NavProgressBar';
import QuestionCard from '../components/QuestionCard';
import { useAuth } from '../../../context/AuthContext'; // Import AuthContext
import { updateInvestorProfile } from '../../../services/investor';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';


const StyledView = styled(View);
const StyledText = styled(Text);

export default function QuestionsScreen({ navigation }) {
    const { signupData, updateSignupData, signUp, setIsInSignupFlow } = useAuth(); // Use AuthContext to manage signup data
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
        // Only update if the value has actually changed
        const currentAnswers = signupData.questions[currentQuestion.id] || [];
        if (JSON.stringify(currentAnswers) !== JSON.stringify(selectedOptions)) {
            updateSignupData(`questions.${currentQuestion.id}`, selectedOptions);
        }
    };

    const handleSignup = async () => {
        try {
            console.log(signupData.password)
            const session = await signUp(signupData.email, signupData.password);
            if (!session) {
                throw Error("Session expected after successful signup, instead found null.");
            }

            await updateInvestorProfile(session.access_token, {
                first: signupData.firstName ?? undefined,
                last: signupData.lastName ?? undefined,
                email: signupData.email,
                ssn: signupData.ssn ?? undefined
            })

            console.log("Sign up worked.")
        } catch (error) {
            console.error('Error signing up:', error.message);
        }


    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleSignup();
        }
    };

    const handleSaveForLater = () => {
        handleSignup();
    };

    return (
        <OnboardingScreenWrapper>

            {/* Progress Bar */}
            <NavProgressBar currentStep={4} totalSteps={6} buttonType={'back'} onPress={() => navigation.goBack()} />\

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
        </OnboardingScreenWrapper>
    );
}
