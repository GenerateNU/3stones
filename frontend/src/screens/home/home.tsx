import { View, Button } from 'react-native';
// import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

// interface HomeScreenProps {
//   // This actually should be `any`, so disabling the linter rule
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   navigation: NavigationScreenProp<any, any>;
// }




const StyledView = styled(View);


// Log out button to test authentication
const TestLogOut = () => {
  const { signOut } = useAuth();
  
  return (
    <StyledView className="w-[100vw] h-[100vh] flex items-center justify-center">
      <Button title="Log Out" onPress={() => {signOut(); }} />
    </StyledView>
  );
};

export default function HomeScreen() {

  
  return (
      <GestureHandlerRootView>
      <StyledView className='flex-1 items-center bg-surfaceBG'>
        <StyledView className='pt-[5vh]'>
          <TestLogOut />
        </StyledView>
      </StyledView>

      </GestureHandlerRootView>
  );
}


