import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageSourcePropType} from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';

interface ProfilePageNavigatorProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
    navigationName: string,
    pageName: string;
    //route to button's icon
    leftIconRoute?: ImageSourcePropType;
    rightIconRoute: ImageSourcePropType;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function ProfilePageNavigator({ navigation, navigationName, pageName, leftIconRoute, rightIconRoute }: ProfilePageNavigatorProps) {
    return(
        <TouchableOpacity onPress={() => navigation.navigate(navigationName)}>
            <StyledView className="flex-row justify-between items-center self-stretch">
                <StyledView className="flex-row justify-between items-center self-stretch space-x-[4vh]">
                    {leftIconRoute && <StyledImage source={leftIconRoute} className='w-[3vh] h-[3vh]'/>}
                    <StyledText className="text-[16px] text-[#282828] font-normal">
                        {pageName}
                    </StyledText>
                </StyledView>
                {rightIconRoute && <StyledImage source={rightIconRoute} className='w-[3vh] h-[3vh]'/>}
            </StyledView>
        </TouchableOpacity>
    );
}