import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const buttonVariants = cva('flex', {
  variants: {
    type: {
      primary: 'bg-defaultPrimary',
      secondary: 'border border-defaultPrimary',
      plainDark: ''
    },
    size: {
      small: 'px-3 py-1 rounded-[25px]',
      medium: 'px-4 py-2 rounded-[50px]',
      large: 'px-5 py-4 rounded-[50px]',
    }
  },
  defaultVariants: {
    type: 'primary',
    size: 'medium'
  }
});

const buttonTextVariants = cva('font-sourceSans3 text-sm font-medium leading-[18px]', {
  variants: {
    type: {
      primary: 'text-white',
      secondary: 'text-defaultPrimary',
      plainDark: 'text-defaultPrimary'
    },
  },
  defaultVariants: {
    type: 'primary',
  }
});

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ 
  children,
  type,
  size,
  ...props 
}: ButtonProps) {
  return (
    <StyledTouchableOpacity 
      className={ buttonVariants({ type, size }) }
      {...props}
    >
      <StyledText className={buttonTextVariants({ type })}>
        {children}
      </StyledText>
    </StyledTouchableOpacity>
  );
}

export default Button;

