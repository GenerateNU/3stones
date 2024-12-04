import React from 'react';
import { Image, View, Text } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import WelcomeToThreeStonesComponent from './components/WelcomeToThreeStones';
import { useAuth } from '../../context/AuthContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function WelcomeScreen({ navigation }) {
  const { setIsInSignupFlow } = useAuth();

  return (
    <StyledView className='flex-1 justify-between items-center bg-surfaceBG p-6'>
      <StyledView>
      <WelcomeToThreeStonesComponent />
      <StyledText className='text-center font-nunitoRegular text-gray-900 mb-8'>
        Providing the tools you need to make your first investments in real estate.
      </StyledText>

      </StyledView>

      {/* Some dummy image, not sure how this works */}
      <StyledView className='align-center'>
        <StyledImage
          className='h-80 w-80 mt-5 mb-5'
          source={require('../../../assets/images/logingraphic.png')}
        />
      </StyledView>

      <StyledView className='w-full'>
        <Button
          type="primary"
          onPress={() => {
            setIsInSignupFlow(true);
            navigation.navigate('EmailInputScreen')
          }} // Replace with your actual navigation route
          disabled={false}
        >
          Sign Up
        </Button>
        <StyledView className='my-2' />

        <Button
          type='secondary'
          onPress={() => navigation.navigate('LoginEmailScreen')} // Replace with your actual navigation route
          disabled={false}
        >
          Login
        </Button>
      </StyledView>
    </StyledView>
  );
}
