import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/BottomTabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
    'SourceSans3-Bold': require('./assets/fonts/sourceSans3/SourceSans3-Bold.ttf'),
    'SourceSans3-Medium': require('./assets/fonts/sourceSans3/SourceSans3-Medium.ttf'),
    'SourceSans3-SemiBold': require('./assets/fonts/sourceSans3/SourceSans3-SemiBold.ttf'),
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
