import React, { useState } from 'react';
import { TextInput, View, Pressable, KeyboardTypeOptions, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

type TextInputComponentProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    isPassword?: boolean;
    keyboardType?: KeyboardTypeOptions; // Explicitly typed as KeyboardTypeOptions
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Explicitly typed as autoCapitalize
};

const TextInputComponent: React.FC<TextInputComponentProps> = ({
    placeholder,
    value,
    onChangeText,
    isPassword = false,
    keyboardType = 'default', // Default value
    autoCapitalize = 'none', // Default value
}) => {
    const [isSecure, setIsSecure] = useState(isPassword);

    const toggleSecureEntry = () => {
        setIsSecure(!isSecure);
    };

    return (
        <StyledView className="flex-row items-center border border-gray-300 h-12 rounded-xl p-2 w-full mb-4 bg-white">
            <StyledTextInput
                className="flex-1 text-base text-gray-900"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword ? isSecure : false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
            />
            {isPassword && (
                <StyledPressable onPress={toggleSecureEntry}>
                    {isSecure ? (
                        <StyledImage source={require('../../../../assets/images/visibility-off.png')}/>
                    ) : (
                        <StyledImage source={require('../../../../assets/images/visibility.png')}/>
                    )}
                </StyledPressable>
            )}
        </StyledView>
    );
};

export default TextInputComponent;
