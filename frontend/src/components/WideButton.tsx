import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import { styled } from 'nativewind';
import { NavigationScreenProp } from 'react-navigation';
import { cva, type VariantProps } from 'class-variance-authority';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);

//variants for different button styles
const buttonVariants = cva('button', {
  variants: {
    intent: {
      //green button
      primary: [
        'w-full',
        'h-full',
        'border-solid',
        'bg-defaultPrimary',
        'border-x-[0.3vw]',
        'border-y-[0.3vw]',
        'rounded-full',
        'flex',
        'items-center',
        'justify-center',
        'flex-row',
      ],
      //outline button
      secondary: [
        'w-full',
        'h-full',
        'border-solid',
        'border-x-[0.3vw]',
        'border-y-[0.3vw]',
        'rounded-full',
        'flex',
        'items-center',
        'justify-center',
        'border-defaultPrimary',
        'flex-row',
      ],
    },
  },
});

//variants for different button text styles
const buttonTextVariants = cva('text', {
  variants: {
    intent: {
      //green button text
      primary: ['text-[2vh]', 'font-nunitoRegular', 'text-white'],
      //outline button text
      secondary: ['text-[2vh]', 'font-nunitoRegular', 'text-defaultPrimary'],
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  //name of button
  name: string;
  //route to button's icon
  iconRoute: ImageSourcePropType;
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

/**
 * Wide button component
 * @param name name of button.
 * @param iconRoute route to button's icon.
 * @param intent button variant (primary = green, secondary = outline).
 * @param navigation navigation prop to direct to another screen/action
 */
const WideButton: React.FC<ButtonProps> = ({ name, iconRoute, intent, navigation }) => {
  return (
    <StyledTouchableOpacity
      onPress={() => navigation.navigate('secondScreen')}
      className={buttonVariants({ intent })}
    >
      <StyledText className={buttonTextVariants({ intent })}>{name}</StyledText>
      <StyledImage source={iconRoute} className='w-[7vw] h-[7vw]'></StyledImage>
    </StyledTouchableOpacity>
  );
};

export default WideButton;
