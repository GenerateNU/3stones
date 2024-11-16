// import React from 'react';
// import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
// import { styled } from 'nativewind';
// import { cva, type VariantProps } from 'class-variance-authority';

// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledText = styled(Text);

// const buttonVariants = cva('flex', {
//   variants: {
//     type: {
//       primary: 'bg-defaultPrimary',
//       secondary: 'border border-defaultPrimary',
//       plainDark: ''
//     },
//     size: {
//       small: 'px-3 py-1 rounded-[25px]',
//       medium: 'px-4 py-2 rounded-[50px]',
//       large: 'px-5 py-4 rounded-[50px]',
//     }
//   },
//   defaultVariants: {
//     type: 'primary',
//     size: 'medium'
//   }
// });

// const buttonTextVariants = cva('font-sourceSans3 text-sm font-medium leading-[18px] text-center', {
//   variants: {
//     type: {
//       primary: 'text-white',
//       secondary: 'text-defaultPrimary',
//       plainDark: 'text-defaultPrimary'
//     },
//   },
//   defaultVariants: {
//     type: 'primary',
//   }
// });

// interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
//   children: React.ReactNode;
//   icon?: React.ReactNode;
// }

// export function Button({ 
//   children,
//   type,
//   size,
//   icon,
//   className,
//   ...props 
// }: ButtonProps & { className?: string }) {
//   return (
//     <StyledTouchableOpacity 
//       className={`${buttonVariants({ type, size })} ${className || ''}`}
//       {...props}
//     >
//       {icon}
//       <StyledText className={buttonTextVariants({ type })}>
//         {children}
//       </StyledText>
//     </StyledTouchableOpacity>
//   );
// }

// export default Button;

import React, { useState } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, GestureResponderEvent } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { styled } from 'nativewind';

// Styled components using NativeWind
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

// Background/Border styles
const backgroundStyles = cva(
  'flex items-center justify-center rounded-full', // Base styles
  {
    variants: {
      type: {
        primary: 'bg-defaultPrimary',
        secondary: 'bg-white border border-defaultPrimary',
        'plain-dark': 'bg-white',
      },
      state: {
        default: '',
        pressed: 'bg-defaultPush',
        disabled: 'bg-gray-300',
      },
      size: {
        small: 'h-8 px-4',
        medium: 'h-10 px-10',
        large: 'h-12 px-8',
      },
    },
    compoundVariants: [
      { type: 'primary', state: 'pressed', className: 'bg-defaultPush' },
      { type: 'primary', state: 'disabled', className: 'bg-gray-300' },
      { type: 'secondary', state: 'pressed', className: 'bg-brand-900' },
      { type: 'secondary', state: 'disabled', className: 'bg-gray-300' },
      { type: 'plain-dark', state: 'pressed', className: 'bg-white text-defaultPush' },
    ],
    defaultVariants: {
      type: 'primary',
      state: 'default',
      size: 'medium',
    },
  }
);

// Text styles
const textStyles = cva(
  'text-center font-medium', // Base styles
  {
    variants: {
      type: {
        primary: 'text-white',
        secondary: 'text-defaultPrimary',
        'plain-dark': 'text-defaultPrimary',
      },
      state: {
        default: '',
        pressed: '',
        disabled: 'text-white',
      },
      size: {
        small: 'text-sm',
        medium: '',
        large: 'text-lg',
      },
    },
    compoundVariants: [
      { type: 'primary', state: 'disabled', className: 'text-white' },
      { type: 'secondary', state: 'pressed', className: 'text-white' },
      { type: 'plain-dark', state: 'pressed', className: 'text-defaultPush' },
    ],
    defaultVariants: {
      type: 'primary',
      state: 'default',
      size: 'medium',
    },
  }
);


// Define button props
interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode; 
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'plain-dark';
  state?: 'default' | 'pressed' | 'disabled';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  onPress,
  children,
  disabled,
  icon,
  ...props
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => !disabled && setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const state = disabled ? 'disabled' : isPressed ? 'pressed' : 'default';

  return (
    <StyledTouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      className={backgroundStyles({ type, state, size })}
      {...props}
    >
      {icon && icon}
      <StyledText className={textStyles({ type, state, size })}>
        {children}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default Button;