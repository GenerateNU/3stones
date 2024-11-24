import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { styled } from 'nativewind';

// Define CVA with NativeWind classes
const radioStyles = cva('items-center justify-center', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md', // Use rounded corners for square checkboxes
    },
    state: {
      default: 'border-4 border-gray-200',
      pressed: 'border-4 border-gray-300',
      disabled: 'border-4 border-gray-500 bg-gray-50',
      disabledSelected: 'border-4 border-gray-500 bg-gray-500',
    },
    selected: {
      true: 'border-4 border-gray-900 bg-gray-900', // Dark border and background for selected state
      false: 'bg-transparent',
    },
  },
  defaultVariants: {
    shape: 'circle', // Default to circular radio buttons
    state: 'default',
    selected: false,
  },
});

// Props for RadioButton
type RadioProps = VariantProps<typeof radioStyles> & {
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  isSquare?: boolean; // New prop to toggle between circle and square
};

// Styled components
const StyledRadioButton = styled(TouchableOpacity);
const StyledInnerFill = styled(View);

const RadioButton: React.FC<RadioProps> = ({
  selected,
  onPress,
  disabled = false,
  isSquare = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <StyledRadioButton
      onPressIn={() => !disabled && setIsPressed(true)} // Activate "pressed" state when touched
      onPressOut={() => {
        setIsPressed(false); // Deactivate "pressed" state on release
        if (!disabled) onPress();
      }}
      className={`${radioStyles({
        shape: isSquare ? 'square' : 'circle', // Toggle shape
        state: disabled ? 'disabled' : isPressed ? 'pressed' : 'default',
        selected,
      })} w-5 h-5`}
      disabled={disabled}
    >
      {/* Render the inner fill for selected state */}
      {selected && (
        <StyledInnerFill
          className={`w-2 h-2 ${isSquare ? 'rounded-sm' : 'rounded-full'} ${
            disabled ? 'bg-gray-400' : 'bg-white'
          }`}
        />
      )}
    </StyledRadioButton>
  );
};

export default RadioButton;
