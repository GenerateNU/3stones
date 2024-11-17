import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './Radio';
import { styled } from 'nativewind';

// A RadioGroup can be passed an array of choices, where each choice is an object with a label and optional disabled and selected flags
type Choice = { label: string; disabled?: boolean; selected?: boolean };

type RadioGroupProps = {
  choices: Choice[];
  onSelect: (selectedChoice: string) => void;
};

const StyledView = styled(View);
const StyledText = styled(Text);

const RadioGroup: React.FC<RadioGroupProps> = ({ choices, onSelect }) => {
  // Find the disabled preselected choice, if any, for initial selection
  const initialSelectedChoice = choices.find(
    (choice) => choice.selected && choice.disabled
  )?.label || null;

  const [selectedChoice, setSelectedChoice] = useState<string | null>(initialSelectedChoice);

  useEffect(() => {
    // Notify parent of initial selection if a choice is preselected and disabled
    if (selectedChoice) {
      onSelect(selectedChoice);
    }
  }, [selectedChoice, onSelect]);

  const handlePress = (choice: string, disabled: boolean) => {
    if (!disabled) {
      setSelectedChoice(choice);
      onSelect(choice);
    }
  };

  return (
    <StyledView className="flex flex-col items-start space-y-4">
      {choices.map(({ label, disabled = false, selected = false }) => (
        <StyledView key={label} className="flex flex-row items-center space-x-2">
          <RadioButton
            selected={selectedChoice === label}
            onPress={() => handlePress(label, disabled)}
            disabled={disabled}
          />
          <StyledText className={`text-base ${disabled ? 'text-gray-400' : 'text-black'}`}>
            {label}
          </StyledText>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default RadioGroup;
