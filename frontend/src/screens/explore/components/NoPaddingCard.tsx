import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);

const cardVariants = cva('bg-white rounded-[16px]', {
  variants: {},
  defaultVariants: {},
});

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function NoPaddingCard({
  children,
  className,
  ...props
}: CardProps & { className?: string }) {
  return (
    <StyledView className={`${cardVariants()} ${className || ''}`} {...props}>
      {children}
    </StyledView>
  );
}

export default NoPaddingCard;
