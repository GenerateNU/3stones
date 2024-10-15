import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

interface ProjectScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ProjectScreen({ navigation }: ProjectScreenProps) {
  return (
    <StyledView className='flex-1 items-center justify-center bg-surfaceBG'>
        <Text>
            Hello, world!
        </Text>
    </StyledView>
  );
}
