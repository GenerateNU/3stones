import React from 'react';
import { View, Pressable, Image, TextInput, Dimensions, GestureResponderEvent } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const searchBarVariants = cva('flex-row items-center px-4 py-2 rounded-full', {
  variants: {
    intent: {
      selected: 'border border-borderSelected bg-surfaceFG text-defaultText',
      unselected: 'border border-borderPrimary bg-surfaceFG text-placeholderText',
      disabled: 'border border-borderPrimary bg-surfaceDisabled text-placeholderText',
    },
    icon: {
      'x-default': '../../assets/images/x-icon-default.png',
      'search-default': '../../assets/images/search-icon-default.png',
      'x-disabled': '../../assets/images/x-icon-disabled.png',
      'search-disabled': '../../assets/images/search-icon-disabled.png',
    },
  },
  compoundVariants: [
    { intent: 'selected', icon: 'x-default', className: 'bg-surfaceFG' },
    { intent: 'unselected', icon: 'search-default', className: 'bg-surfaceFG' },
    { intent: 'disabled', icon: 'x-disabled', className: 'bg-surfaceDisabled' },
    { intent: 'disabled', icon: 'search-disabled', className: 'bg-surfaceDisabled' },
  ],
});

const iconVariants = {
  'x-default': require('../../assets/images/x-icon-default.png'),
  'x-disabled': require('../../assets/images/x-icon-disabled.png'),
  'search-default': require('../../assets/images/search-icon-default.png'),
  'search-disabled': require('../../assets/images/search-icon-disabled.png')
};

const { height: screenHeight } = Dimensions.get('window');
const calculatedWidth = (239 / 1000) * screenHeight;
const calculatedHeight = (42 / 1000) * screenHeight;

type SearchBarProps = VariantProps<typeof searchBarVariants> & {
  value: string;
  onValueChange: (text: string) => void;
  onPressed: (event: GestureResponderEvent) => void;
  intent: string;
  icon: string;
  textColor: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, intent, icon, textColor, onValueChange, onPressed }) => {
  return (
    <StyledView className={searchBarVariants({ intent, icon })} style={{ width: calculatedWidth, height: calculatedHeight, paddingHorizontal: 12 }}>
      <StyledTextInput
        style={{ fontSize: 14, fontFamily: "sourceSans3", fontWeight: 500}}
        className="flex-1"
        placeholder={value}
        placeholderTextColor={textColor}
        onChangeText={onValueChange}
      />
      <StyledPressable className="ml-2" onPress={onPressed}>
        <StyledImage source={iconVariants[icon || 'clear']} style={{ width: 14, height: 14 }} />
      </StyledPressable>
    </StyledView>
  );
};

export default SearchBar;