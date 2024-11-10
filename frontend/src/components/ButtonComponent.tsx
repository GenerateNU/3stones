import React from 'react';
import { Pressable, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const ButtonComponent = ({ title, theme, onPress, disabled }) => {
  const getButtonStyle = () => {
    if (disabled) {
      return 'bg-gray-300 text-disabledText'; // Disabled state styling
    }
    
    switch (theme) {
      case 'primary':
        // for some reason text-white is not working, shows black. So, using text-surfaceFG
        return 'bg-defaultPrimary text-white'; // Filled green button
      case 'secondary':
        return 'border border-defaultPrimary text-defaultPrimary'; // Outlined green button
      default:
        return 'bg-gray-200 text-black'; // Fallback style
    }
  };

  return (
    <StyledPressable
      className={`w-full rounded-full py-3 px-6 ${getButtonStyle()}`}
      onPress={onPress}
      disabled={disabled} // Pressable is disabled when this is true
    >
      <StyledText className={`text-center ${getButtonStyle()}`}>{title}</StyledText>
    </StyledPressable>
  );
};

export default ButtonComponent;
