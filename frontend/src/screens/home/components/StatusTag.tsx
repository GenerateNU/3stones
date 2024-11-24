import React from 'react';
import { Text, Image, ImageSourcePropType, View } from 'react-native';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

//variants for different button styles
const statusTagVariants = cva('button', {
  variants: {
    intent: {
      //green button
      InProgress: [
        'w-[30vw]',
        'h-full',
        'rounded-xl',
        'flex',
        'items-center',
        'justify-center',
        'bg-mint',
        'flex-row',
      ],
      //Funding button
      Funding: [
        'w-[25vw]',
        'h-full',
        'border-borderPrimary',
        'border-x-[0.3vw]',
        'border-y-[0.3vw]',
        'rounded-xl',
        'flex',
        'items-center',
        'justify-center',
        'flex-row',
      ],
      Sold: [
        'h-full',
        'rounded-xl',
        'flex',
        'items-center',
        'justify-center',
        'flex-row',
        'bg-success',
        'w-[20vw]'
      ],
    },
  },
});

//variants for different button text styles
const statusTagTextVariants = cva('text', {
  variants: {
    intent: {
      //green button text
      InProgress: ['text-[3.5vw]', 'font-sourceSans3', 'text-success', 'ml-[1vw]'],
      //outline button text
      Funding: ['text-[3.5vw]', 'font-sourceSans3', 'text-success'],
      //Sold button
      Sold: ['text-[3.5vw]', 'font-sourceSans3', 'text-white', 'ml-[1vw]'],
    },
  },
});

export interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof statusTagVariants> {
  //name of button
  name: string;
  //route to button's icon
  iconRoute: ImageSourcePropType;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intent: 'InProgress' | 'Funding' | 'Sold';
}

/**
 * Wide button component
 * @param name name of button.
 * @param iconRoute route to button's icon.
 * @param intent button variant (funding, sold, in progress).
 */
const StatusTag: React.FC<TagProps> = ({ name, iconRoute, intent }) => {
  return (
    <StyledView className={statusTagVariants({ intent })}>
      <StyledImage source={iconRoute} className='w-[4vw] h-[4vw]'></StyledImage>
      <StyledText className={statusTagTextVariants({ intent })}>{name}</StyledText>
    </StyledView>
  );
};

export default StatusTag;
