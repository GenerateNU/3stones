import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import RadioButtonComponent from './components/RadioButtonComponent';  // Import the new component
import ProgressBar from '../../components/ProgressBar';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);

export default function InvestmentPlanScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('');

  // Options for the investment duration
  const options = [
    { id: '1-2', label: '1 - 2 years' },
    { id: '3-4', label: '3 - 4 years' },
    { id: '5-6', label: '5 - 6 years' },
    { id: '6+', label: 'More than 6 years' },
  ];

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
            <ProgressBar
                current={5}
                total={6}
            />
          </StyledView>

          {/* Question Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">Last but not least</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              Take a second to answer questions to better understand you as an investor.
            </StyledText>

            <StyledText className="text-center text-sm font-bold text-black mb-4">
              When making a long-term investment, I plan to keep the money invested for...
            </StyledText>

            {/* Radio Buttons for options */}
            {options.map((option) => (
              <RadioButtonComponent
                key={option.id}
                label={option.label}
                selected={selectedOption === option.id}
                onPress={() => setSelectedOption(option.id)}
              />
            ))}
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={() => {() => navigation.navigate('homeScreen')}}
              disabled={!selectedOption} // Disable if no email
            >Next</Button>
          </StyledView>

        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
