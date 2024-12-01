import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import RadioGroup from '../../../components/RadioGroup'; // Import your RadioGroup component
import RadioButton from '../../../components/Radio'; // Import your RadioButton component for multiple-choice

const StyledView = styled(View);
const StyledText = styled(Text);

export default function QuestionCard({ question, selectedAnswers, onSelectOption, currentIndex, totalQuestions }) {
    const isMultipleChoice = question.type === 'multiple';

    const handleOptionSelect = (option) => {
        if (isMultipleChoice) {
            const updatedAnswers = selectedAnswers.includes(option)
                ? selectedAnswers.filter((ans) => ans !== option)
                : [...selectedAnswers, option];
            onSelectOption(updatedAnswers);
        } else {
            onSelectOption([option]);
        }
    };

    return (
        <StyledView className="w-full flex-1 bg-white p-6 rounded-lg shadow-md relative">
            {/* Question Tracker */}
            <StyledText className="absolute top-4 right-4 text-gray-500 text-sm font-bold">
                {currentIndex + 1}/{totalQuestions}
            </StyledText>

            {/* Question Text */}
            <StyledText className="font-bold mb-8 pr-4">{question.text}</StyledText>

            {/* Render Options */}
            <RadioGroup
                choices={question.options.map((option) => ({
                    label: option,
                    selected: selectedAnswers.includes(option),
                }))}
                onSelect={onSelectOption}
                isMultiple={isMultipleChoice}
            />
        </StyledView>
    );
}
