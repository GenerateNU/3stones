import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

const textFieldVariants = cva(
  'w-full border border-border rounded-xl px-3 py-2 font-sourceSans3 text-base', 
  {
    variants: {
      state: {
        default: '',
        focused: 'border-defaultPrimary bg-white',
        error: 'bg-[#D32246]'
      }
    },
    defaultVariants: {
      state: 'default'
    }
  }
);

const helperTextVariants = cva(
  'text-sm mt-1 font-sourceSans3',
  {
    variants: {
      state: {
        default: 'text-gray-600',
        error: 'text-critical'
      }
    },
    defaultVariants: {
      state: 'default'
    }
  }
);

interface TextFieldProps extends TextInputProps, VariantProps<typeof textFieldVariants> {
  helperText?: string;
  error?: boolean;
}

export function TextField({
  helperText,
  error,
  state = 'default',
  ...props
}: TextFieldProps) {
  const currentState = error ? 'error' : state;
  
  return (
    <StyledView className={textFieldVariants({ state: currentState })}>
      <StyledTextInput
        placeholderTextColor="#727272"
        {...props}
      />
      {helperText && (
        <StyledText 
          className={helperTextVariants({ 
            state: error ? 'error' : 'default' 
          })}
        >
          {helperText}
        </StyledText>
      )}
    </StyledView>
  );
}

export default TextField;
