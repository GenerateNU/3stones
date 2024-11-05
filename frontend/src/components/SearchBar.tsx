import React from 'react';
import { View, Pressable, Image, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const searchBarVariants = cva('flex-row items-center px-4 py-2 rounded-full', {
  variants: {
    intent: {
      selected: 'border border-neutral-900',
      unselected: 'border border-neutral-500',
      filled: 'border border-neutral-500 bg-gray-400',
    },
    icon: {
      clear: '../../assets/images/x-icon.png',
      search: '../../assets/images/search-icon.png',
    },
  },
  compoundVariants: [
    { intent: 'selected', icon: 'clear', className: 'bg-white' },
    { intent: 'unselected', icon: 'search', className: 'bg-white' },
    { intent: 'filled', icon: 'clear', className: 'bg-gray-400' },
    { intent: 'filled', icon: 'search', className: 'bg-gray-400' },
  ],
});

const iconVariants = {
  clear: require('../../assets/images/x-icon.png'),
  search: require('../../assets/images/search-icon.png'),
};

type SearchBarProps = VariantProps<typeof searchBarVariants> & {
  value: string;
  onValueChange: (text: string) => void;
  intent: string;
  icon: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onValueChange, intent, icon }) => {
  return (
    <StyledView className={searchBarVariants({ intent, icon })}>
      <StyledTextInput
        className="text-defaultText flex-1"
        placeholder={value}
        onChangeText={onValueChange}
      />
      <StyledPressable className="ml-2">
        <StyledImage source={iconVariants[icon || 'clear']} style={{ width: 16, height: 16 }} />
      </StyledPressable>
    </StyledView>
  );
};

export default SearchBar;