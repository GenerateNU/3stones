import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import { useAuth } from '../../context/AuthContext';

const StyledView = styled(View);
// const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

const SampleLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useAuth();

  //Sign in
  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.message || 'An error occurred during sign-in');
    }
  };

  return (
    <StyledView className='w-[100vw] flex h-[100vh] items-center justify-center space-y-[20vh]'>
      <StyledText>Testing for Login</StyledText>
      <StyledTextInput
        placeholder='email'
        value={email}
        onChangeText={setEmail}
        className='h-[5vh] border border-black w-[60vw] rounded-md'
      />
      <StyledTextInput
        placeholder='password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        className='h-[5vh] border border-black w-[60vw] rounded-md'
      />
      {error && <StyledText className='py-[3vh]'>{error}</StyledText>}
      <StyledButton
        title='Login'
        onPress={() => {
          handleSignIn();
        }}
      />
    </StyledView>
  );
};

export default SampleLoginScreen;
