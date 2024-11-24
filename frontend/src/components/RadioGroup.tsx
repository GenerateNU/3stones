import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RadioButton from './Radio';
import { styled } from 'nativewind';


// A RadioGroup can be passed an array of choices, where each choice is an object with a label and optional disabled and selected flags
type Choice = { label: string; disabled?: boolean; selected?: boolean };


type RadioGroupProps = {
   choices: Choice[];
   onSelect: (selectedChoices: string[]) => void;
   isMultiple?: boolean; // New prop to indicate multiple-choice
};


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


const RadioGroup: React.FC<RadioGroupProps> = ({ choices, onSelect, isMultiple = false }) => {
   const [selectedChoices, setSelectedChoices] = useState<string[]>([]);


   useEffect(() => {
       onSelect(selectedChoices);
   }, [selectedChoices, onSelect]);


   const handlePress = (choice: string, disabled: boolean) => {
       if (disabled) return;


       if (isMultiple) {
           const updatedChoices = selectedChoices.includes(choice)
               ? selectedChoices.filter((c) => c !== choice)
               : [...selectedChoices, choice];
           setSelectedChoices(updatedChoices);
       } else {
           setSelectedChoices([choice]);
       }
   };


   return (
       <StyledView className="w-full flex flex-col space-y-4">
           {choices.map(({ label, disabled = false }) => (
               <StyledTouchableOpacity
                   key={label}
                   className={`flex flex-row items-center p-6 rounded-lg justify-between ${
                       selectedChoices.includes(label) ? 'border border-primary' : 'bg-surfaceBG'
                   } ${disabled ? 'opacity-50' : 'opacity-100'}`}
                   onPress={() => handlePress(label, disabled)}
                   disabled={disabled} // Disable tapping if the option is disabled
               >
                   {/* Label */}
                   <StyledText className="text-sm text-black font-bold">{label}</StyledText>


                   {/* Radio Button */}
                   <RadioButton
                       selected={selectedChoices.includes(label)}
                       onPress={() => handlePress(label, disabled)}
                       disabled={disabled}
                       isSquare={isMultiple}
                   />
               </StyledTouchableOpacity>
           ))}
       </StyledView>
   );
};


export default RadioGroup;