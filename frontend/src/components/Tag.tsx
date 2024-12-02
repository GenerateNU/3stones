import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledText = styled(Text);

const tagVariants = cva('flex flex-row items-center rounded-lg px-3 py-1', {
  variants: {
    level: {
      neutral: 'bg-gray-900',
      success: 'bg-success',
      warning: 'bg-[#F7B418]',
      critical: 'bg-[#D32246]',
      neutralSubdued: 'bg-gray-200',
      successSubdued: 'bg-[#ECF3ED]',
      warningSubdued: 'bg-[#F9EFD7]',
      criticalSubdued: 'bg-[#F8EDED]',
    },
  },
  defaultVariants: {
    level: 'neutral',
  },
});

const tagTextVariants = cva('text-xs font-sourceSans3Medium', {
  variants: {
    level: {
      neutral: 'text-white',
      success: 'text-white',
      warning: 'text-gray-900',
      critical: 'text-white',
      neutralSubdued: 'text-gray-600',
      successSubdued: 'text-success',
      warningSubdued: 'text-[#F7B418]',
      criticalSubdued: 'text-[#D32246]',
    },
  },
  defaultVariants: {
    level: 'neutral',
  },
});

interface TagProps extends ViewProps, VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Tag({
  children,
  level,
  icon,
  className,
  ...props
}: TagProps & { className?: string }) {
  return (
    <StyledView className={`${tagVariants({ level })} ${className || ''}`} {...props}>
      {icon && <StyledView className='mr-1'>{icon}</StyledView>}
      <StyledText className={tagTextVariants({ level })}>{children}</StyledText>
    </StyledView>
  );
}

export default Tag;
