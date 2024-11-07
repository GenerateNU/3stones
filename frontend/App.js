import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/BottomTabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import SampleLoginScreen from './src/screens/home/sampleLoginScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

// Navigates user to the log in screen if seesion is not found (i.e. user not logged in)
function RootNavigator() {
  const { session, isLoading } = useAuth();
  if (isLoading) {
    return null; // or some loading screen (maybe we make in future?)
  }
  return session ? <TabNavigator /> : <SampleLoginScreen />;
}

export default function App() {
  const [loaded, error] = useFonts({
    'Nunito-Black': require('./assets/fonts/nunito/Nunito-Black.ttf'),
    'Nunito-BoldItalic': require('./assets/fonts/nunito/Nunito-BoldItalic.ttf'),
    'Nunito-Bold': require('./assets/fonts/nunito/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/nunito/Nunito-ExtraBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/nunito/Nunito-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/inter/Inter_18pt-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
    'SourceSans3-Regular': require('./assets/fonts/sourceSans3/SourceSans3-Regular.ttf'),
    'SourceSans3-Bold': require('./assets/fonts/sourceSans3/SourceSans3-Bold.ttf'),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
}
