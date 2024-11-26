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
      //InProgress button
      InProgressGreen: [
        'rounded-lg',
        'flex',
        'items-center',
        'justify-center',
        'bg-mint',
        'flex-row',
      ],
      InProgressNeutral: [
        'rounded-lg',
        'flex',
        'items-center',
        'justify-center',
        'flex-shrink',
        'bg-gray-200',
        'flex-row',
      ],
      //Funding button
      Funding: [
        'border-borderPrimary',
        'border-x-[0.3vw]',
        'border-y-[0.3vw]',
        'rounded-lg',
        'flex',
        'items-center',
        'justify-center',
        'w-[20vw]',
        'flex-row',
      ],
      Sold: [
        'rounded-lg',
        'w-[20vw]',
        'flex',
        'items-center',
        'justify-center',
        'flex-row',
        'bg-success',
      ],
    },
  },
});

//variants for different button text styles
const statusTagTextVariants = cva('text', {
  variants: {
    intent: {
      InProgressNeutral: ['text-[2.5vw]', 'font-sourceSans3', 'text-gray-600', 'px-[1vw]', 'py-[2vw]',],
      InProgressGreen: ['text-[2.5vw]', 'font-sourceSans3', 'text-success', 'px-[1vw]', 'py-[2vw]', ],
      Funding: ['text-[2.5vw]', 'font-sourceSans3', 'text-success', 'px-[1vw]', 'py-[2vw]', ],
      Sold: ['text-[2.5vw]', 'font-sourceSans3', 'text-white', 'px-[1vw]', 'py-[2vw]', ],
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
  intent: 'InProgressGreen' | 'InProgressNeutral' | 'Funding' | 'Sold';
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
      <StyledImage source={iconRoute} className='w-[3.5vw] h-[3.5vw] pl-[1vw]'></StyledImage>
      <StyledText className={statusTagTextVariants({ intent })}>{name}</StyledText>
    </StyledView>
  );
};

export default StatusTag;
