import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export default function PageHeader({ title, showBackButton = true, rightComponent }: PageHeaderProps) {
  const navigation = useNavigation();

  return (
    <StyledView className="w-full flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
      <StyledView className="flex-row items-center">
        {showBackButton && (
          <StyledTouchableOpacity 
            className="mr-2" 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </StyledTouchableOpacity>
        )}
        <StyledText className="text-xl font-semibold text-gray-900">
          {title}
        </StyledText>
      </StyledView>
      
      {rightComponent && (
        <StyledView>
          {rightComponent}
        </StyledView>
      )}
    </StyledView>
  );
}
