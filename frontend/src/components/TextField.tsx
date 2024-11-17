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
            'items-center',
            'bg-surfaceFG',
            'border-border',
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]', 
        ],
        hover: [
            'flex w-82',
            'flex-col',
            'items-center',
            'bg-gray-200', 
            'border-gray-300', 
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]', 
        ],
         focus: [
            'flex w-82',
            'flex-col',
            'items-center',
            'bg-surfaceFG',
            'border-border-selected', 
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]',
         ],
        error: [
            'flex w-82',
            'flex-row',
            'items-center',
            'bg-surfaceFG',
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]',
            'border-error',
        ],
         filled: [
            'flex w-82',
            'flex-col',
            'items-center',
            'bg-surfaceFG',
            'border-gray-200',
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]',
            
         ],
         disabled: [
            'flex w-82',
            'flex-col',
            'items-center',
            'bg-gray-300',
            'border-gray-500',
            'border-x-[0.3px]',
            'border-y-[0.3px]', 
            'rounded-[12px]', 
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
          'flex-row',
          'items-center',
          'pr-4', 
          'justify-between',   
        ],
        prefix: [
          'flex-row',
          'items-center',
          'pl-4',
        ],
        suffix: [
          'flex-row',
          'items-center',
          'pr-4', 
          'justify-between',   
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
            'color-gray-600', 
        ],
        hover: [
            'body-regular',
            'color-gray-600', 
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
            'color-gray-500', 
         ]
      },
    },
  });

  export interface TextFieldProps
    extends TextInputProps,
    VariantProps<typeof textFieldVariants> {
      //route to the icon optional
      iconRoute?: ImageSourcePropType;
      //placeholder for the text field
      placeholder: string;
      //error message
      errorMessage?: string;
      //preffix
      prefix?: string;
      //suffix
      suffix?: string;
      //counter value 
      count?: string;
}

/**
 * TextField component
 * @param iconRoute route to TextField's icon (optional).
 * @param intent TextField variant (default, hover, focused, filled, error, diabled).
 * @param size TextField size (medium, large)
 * @param icon Location of the icon (deafult, left, right, prefix, suffix, counter)
 * @param errorMessage The message to be displayed if the intent is error (optional)
 * @param placeholder The text you want to display before you type into the field
 * @param prefix If you want a value to go infront of the text (optional)
 * @param suffix If you want a value to go after the text (optional)
 * @param count The value you want to counter to be out of (optional)
 */

const TextField: React.FC<TextFieldProps> = ({iconRoute, intent, size, icon, errorMessage, placeholder, prefix, suffix, count}) => {

  const [value, setValue] = React.useState('');

  function onChangeInput(text) {
    setValue(text);
  }
    
  return (
    <StyledView className = 'p-4 gap-0.5 items-start flex-col'>
    <StyledView className = {textFieldVariants({size, intent, icon})}>
      {(icon === 'left') && iconRoute && (
        <StyledImage source={iconRoute} className="mr-2" /> 
        )}
        {(icon === 'prefix') && prefix && (
         <StyledText className="ml-2 text-primary-default">{prefix}</StyledText>
        )}
        <StyledTextInput 
        className = {textFieldTextVariants({ intent})}
        onChangeText={onChangeInput}
        value={value}
        editable={true}
        placeholder={placeholder}/>
      {(icon === 'right') && iconRoute && (
        <StyledImage source={iconRoute} className="ml-2 items-right" /> 
      )}
      {(icon === 'suffix') && suffix && (
        <StyledText className="ml-2 text-primary-default">{suffix}</StyledText>
      )}
      {icon === 'counter' && (
        <StyledText className="ml-2 text-primary-default">{`${value.length}/${count}`}</StyledText>
      )}
       
      </StyledView>
      {intent === 'error' && errorMessage && (
        <StyledView className = "flex-row items-center gap-2">
          <Image source={require('../../../assets/images/error.png')} />
          <StyledText className="text-error mt-1">{errorMessage}</StyledText>
       </StyledView>
      )}
      </StyledView>
  );
};

export default TextField;