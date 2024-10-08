import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/BottomTabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Nunito-Black': require('./assets/fonts/nunito/Nunito-Black.ttf'),
    'Nunito-BoldItalic': require('./assets/fonts/nunito/Nunito-BoldItalic.ttf'),
    'Nunito-Bold': require('./assets/fonts/nunito/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/nunito/Nunito-ExtraBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/nunito/Nunito-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/inter/Inter_18pt-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
