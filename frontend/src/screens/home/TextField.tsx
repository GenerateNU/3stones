import React from 'react';
import { styled } from 'nativewind';
import { cva, type VariantProps } from 'class-variance-authority';
import { TextInput, View, Text, TextInputProps, ImageSourcePropType, Image} from 'react-native';

const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledView = styled(View);
const StyledImage = styled(Image);

const textFieldVariants = cva('textField', {
    variants: {
      intent: {
        default: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-surfaceFG',
            'border-border',
            'rounded-spacing-xs',
        ],
        hover: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-gray-200', //not in config file #DDD
            'border-gray-300', //not in config file #BBB
            'rounded-spacing-xs',
        ],
         focus: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-surfaceFG',
            'border-border-selected', //not in config file #4B4B4B
            'rounded-spacing-xs',
         ],
        error: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-surfaceFG',
            'border-error', 
            'rounded-spacing-xs',
        ],
         filled: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-surfaceFG',
            'border-gray-200',
            'rounded-spacing-xs',
         ],
         disabled: [
            'flex w-82',
            'flex-col',
            'items-start',
            'bg-gray-300',
            'border-gray-500',
            'rounded-spacing-xs',
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
          'flex-row',
          'items-center',
          'pl-4',
        ],
        right: [
          'flex-row-reverse',
          'items-center',
          'pr-4', 
        ],
        prefix: [
          'flex-row',
          'items-center',
          'pl-4',
        ],
        suffix: [
          'flex-row-reverse',
          'items-center',
          'pr-4', 
        ],
        counter: [
          'flex-row',
          'justify-between',
          'items-center',
          'pr-4', 
        ],
      }
    },
  });

//variants for different text field text styles
const textFieldTextVariants = cva('text', {
    variants: {
      intent: {
        default: [
            'body-regular',
            'color-gray-600', //not in config file #727272
        ],
        hover: [
            'body-regular',
            'color-gray-600', //not in config file #727272
        ],
         focus: [
            'body-regular',
            'color-default-text',
         ],
        error: [
            'body-regular',
            'color-default-text',
        ],
         filled: [
            'body-regular',
            'color-default-text',
         ],
         disabled: [
            'body-regular',
            'color-gray-500', //not in config file #868686
         ]
      },
    },
  });

  export interface TextFieldProps
    extends TextInputProps,
    VariantProps<typeof textFieldVariants> {
      //name of textfield
      name: string;
      //route to the icon optional
      iconRoute?: ImageSourcePropType;
      //placeholder for the text field
      placeholder: string;
      //error message
      errorMessage?: string;
}

/**
 * TextField component
 * @param name name of TextField.
 * @param iconRoute route to TextField's icon (optional).
 * @param intent TextField variant (default, hover, focused, filled, error, diabled).
 * @param size TextField size (medium, large)
 * @param icon Location of the icon (deafult, left, right, prefix, suffix, counter)
 * @param errorMessage The message to be displayed if the intent is error 
 * @param placeholder The text you want to display before you type into the field
 * 
 */

const TextField: React.FC<TextFieldProps> = ({ name, iconRoute, intent, size, icon, errorMessage, placeholder}) => {

  const [value, setValue] = React.useState('');

  function onChangeInput(text) {
    setValue(text);
  }
    
  return (
    <StyledView className  = {textFieldVariants({size, intent})}>
      {(icon === 'left' || icon === 'prefix') && iconRoute && (
        <StyledImage source={iconRoute} className="mr-2" /> 
        )}
        <StyledTextInput 
        className = {textFieldTextVariants({intent})}
        onChangeText={onChangeInput}
        value={value}/>
      {(icon === 'right' || icon === 'suffix') && iconRoute && (
        <StyledImage source={iconRoute} className="ml-2" /> 
      )}
      {icon === 'counter' && (
        //Need to pass the count in or is it always 20?
        <StyledText className="ml-2 text-gray-600">{`${value.length}/20`}</StyledText>
      )}
        {intent === 'error' && errorMessage && (
        <StyledText className="text-red-500 mt-1">{errorMessage}</StyledText>
      )}
      </StyledView>
  );
};

export default TextField