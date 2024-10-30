import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledText = styled(Text);

const tagVariants = cva('flex flex-row items-center rounded-full px-2 py-1', {
  variants: {
    level: {
      neutral: 'bg-gray-100',
      success: 'bg-brand50',
      warning: 'bg-yellow-100',
      critical: 'bg-red-100'
    },
    type: {
      default: '',
      defaultWithIcon: '',
      subduedWithIcon: 'opacity-60',
      subdued: 'opacity-60'
    }
  },
  defaultVariants: {
    level: 'neutral',
    type: 'default'
  }
});

const tagTextVariants = cva('text-sm font-sourceSans3', {
  variants: {
    level: {
      neutral: 'text-gray-700',
      success: 'text-success',
      warning: 'text-yellow-700',
      critical: 'text-red-700'
    },
    type: {
      default: '',
      defaultWithIcon: 'ml-1',
      subduedWithIcon: 'ml-1',
      subdued: ''
    }
  },
  defaultVariants: {
    level: 'neutral',
    type: 'default'
  }
});

interface TagProps extends ViewProps, VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Tag({
  children,
  level,
  type,
  icon,
  ...props
}: TagProps) {
  return (
    <StyledView
      className={tagVariants({ level, type })}
      {...props}
    >
      {(type === 'defaultWithIcon' || type === 'subduedWithIcon') && icon}
      <StyledText className={tagTextVariants({ level, type })}>
        {children}
      </StyledText>
    </StyledView>
  );
}

export default Tag;
