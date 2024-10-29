import React from 'react';
import { TouchableOpacity, View, Text, Image} from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

interface ProfilePageNavigatorProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
    pageName: string
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function ProfilePageNavigator({ navigation, pageName }: ProfilePageNavigatorProps) {
    return(
        <TouchableOpacity onPress={() => navigation.navigate({pageName})}>
            <StyledView className="flex-row justify-between items-center self-stretch px-[4vw]">
                <StyledText className="text-[16px] text-[#282828] font-normal leading-[22px]">
                    {pageName}
                </StyledText>
                <StyledImage source={require('../assets/images/side-arrow.png')} className='h-[3vh] w-[3vh]'/>
            </StyledView>
        </TouchableOpacity>
    );
}