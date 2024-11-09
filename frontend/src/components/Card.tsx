import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);

const cardVariants = cva('bg-white rounded-[16px] border border-border p-4', {
  variants: {},
  defaultVariants: {}
});

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function Card({
  children,
  ...props
}: CardProps) {
  return (
    <StyledView
      className={cardVariants()}
      {...props}
    >
      {children}
    </StyledView>
  );
}

export default Card;
