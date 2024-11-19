import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { styled } from 'nativewind';

// Define CVA with NativeWind classes
const radioStyles = cva('rounded-full items-center justify-center', {
    variants: {
        state: {
            default: 'border-4 border-gray-200',
            pressed: 'border-4 border-gray-300',
            disabled: 'border-4 border-gray-500 bg-gray-50',
            disabledSelected: 'border-4 border-gray-500 bg-gray-500'
        },
        selected: {
            true: 'border-5 border-gray-900 bg-gray-900', // Dark border and background for selected state
            false: 'bg-transparent',
        },
    },
    defaultVariants: {
        state: 'default',
        selected: false,
    },
});

// Radio buttons can be in one of three states: default, pressed, or disabled. Each of these can also be selected or not.
type RadioProps = VariantProps<typeof radioStyles> & {
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
};

// Styled components
const StyledRadioButton = styled(TouchableOpacity);
const StyledInnerCircle = styled(View);

// RadioButton component
const RadioButton: React.FC<RadioProps> = ({ selected, onPress, disabled = false }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <StyledRadioButton
            onPressIn={() => !disabled && setIsPressed(true)}  // Activate "pressed" state when touched
            onPressOut={() => {
                setIsPressed(false);  // Deactivate "pressed" state on release
                if (!disabled) onPress();
            }}
            className={`${radioStyles({
                state: disabled ? 'disabled' : isPressed ? 'pressed' : 'default',
                selected,
            })} w-6 h-6`}
            disabled={disabled}
        >
            {/* Conditionally render the inner circle based on selected and disabled states */}
            {selected && (
                <StyledInnerCircle
                    className={`w-2 h-2 rounded-full ${disabled ? 'bg-gray-400' : 'bg-white'
                        }`}
                />
            )}
        </StyledRadioButton>
    );
};

export default RadioButton;
