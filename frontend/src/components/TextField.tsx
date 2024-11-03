import React from 'react';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const textFieldVariants = cva('textField', {
    variants: {
      intent: {
        default: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
            'bg-surfaceFG',
            'border-border'
        ],
        hover: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
        ],
         focus: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
         ],
        error: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
        ],
         filled: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
         ],
         disabled: [
            'flex w-[328px]',
            'flex-col',
            'items-start',
         ]
      },
      size: {
        medium: [
            'flex',
            'p-[8px_12px]', 
            'items-center',
            'gap-2',
            'self-stretch',

        ],
        large: [
            'flex',
            'p-[12px_16px]', 
            'items-center',
            'gap-2',
            'self-stretch',

        ],
      },
      icon: {
        default: [

        ],
        left: [

        ],
        right: [

        ],
        preffix: [

        ],
        suffix: [

        ],
        counter: [

        ],
      }
    },
  });

//variants for different button text styles
const textFieldTextVariants = cva('text', {
    variants: {
      intent: {
        default: [
        ],
        hover: [
        ],
         focus: [
         ],
        error: [
        ],
         filled: [
         ],
         disabled: [
         ]
      },
    },
  });