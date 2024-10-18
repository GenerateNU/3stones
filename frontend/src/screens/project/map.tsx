import React from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';

interface ProjectMapScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ProjectMapScreen({ navigation }: ProjectMapScreenProps) {
    return (
        <Text>
            Map screen
        </Text>
    );
}
