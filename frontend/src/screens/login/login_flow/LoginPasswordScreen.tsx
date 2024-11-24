import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext'; // Updated import path for useAuth
import { Ionicons } from '@expo/vector-icons';
import WelcomeToThreeStonesComponent from '../components/WelcomeToThreeStones';
import TextInputComponent from '../components/TextInputComponent';
import NavProgressBar from '../components/NavProgressBar';
import OnboardingScreenWrapper from '../components/OnboardingScreenWrapper';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginPasswordScreen({ navigation }) {
  const { loginData, updateLoginData, login } = useAuth(); // Access loginData and updateLoginData from AuthContext
  const [password] = useState(loginData.password);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(loginData.email, password);
      setError(null);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleEditEmail = () => {
    navigation.navigate('LoginEmailScreen'); // Navigate back to email screen
  };

  return (
    <OnboardingScreenWrapper>
      <NavProgressBar buttonType={'back'} onPress={() => navigation.goBack()} />

      {/* Welcome Text */}
      <WelcomeToThreeStonesComponent />

      {/* Email Display with Edit Icon */}
      <StyledView className="flex-row items-center mt-6 bg-gray-100 px-4 py-2 rounded-full border border-gray-300">
        <StyledText className="text-gray-700">{loginData.email}</StyledText>
        <StyledTouchableOpacity onPress={handleEditEmail} className="ml-2">
          <Ionicons name="pencil" size={16} color="gray" />
        </StyledTouchableOpacity>
      </StyledView>

      {/* Password Input Section */}
      <StyledView className="w-full flex-1 justify-center items-center mt-10">
        <TextInputComponent
          placeholder="Password"
          value={loginData.password}
          onChangeText={(input) => updateLoginData('password', input)}
          isPassword={true}
          error={!!error}
        />
        {error && (
          <StyledText className='text-red-500 text-sm mt-2'>
            {error}
          </StyledText>
        )}
      </StyledView>

      {/* Continue Button */}
      <StyledView className="w-full">
        <Button
          type="plain-dark"
          size="small"
        >
          Forgot Login?
        </Button>
        <Button
          type="primary"
          onPress={handleLogin}
          disabled={!loginData.password.trim()}
        >
          Login
        </Button>
      </StyledView>
    </OnboardingScreenWrapper>
  );
}