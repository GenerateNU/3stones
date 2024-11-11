import React, { useState } from 'react';
import { TextInput, View, Pressable } from 'react-native';
import { styled } from 'nativewind';
// import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline'; // You can use any icon library.

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

const TextInputComponent = ({ placeholder, value, onChangeText, isPassword }) => {
    const [isSecure, setIsSecure] = useState(isPassword);

    const toggleSecureEntry = () => {
        setIsSecure(!isSecure);
    };

    return (
        <StyledView className="flex-row items-center border border-border rounded-lg p-2 w-full mb-4 bg-white">
            <StyledTextInput
                className="flex-1 text-base text-gray-900"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isSecure} // Toggle this based on the state
                autoCapitalize="none"
            />
            {/* {isPassword && (
                <StyledPressable onPress={toggleSecureEntry}>
                    {isSecure ? (
                        <EyeSlashIcon style={{ width: 24, height: 24 }} />
                    ) : (
                        <EyeIcon style={{ width: 24, height: 24 }} />
                    )}
                </StyledPressable>
            )} */}
        </StyledView>
    );
};

export default TextInputComponent;
