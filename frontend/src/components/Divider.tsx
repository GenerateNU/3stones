import React from 'react';
import { View, Text, Image, ImageSourcePropType} from 'react-native';
import { styled } from 'nativewind';
import { CaptionText } from './typography';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface DividerProps {
    text?: string;
    image?: ImageSourcePropType;
}

const Divider: React.FC<DividerProps> = ({ text, image }) => {
    return(
        <StyledView className='relative flex-row items-center w-full'>
            <StyledView className='flex-1 h-[0.2vh] bg-gray-300'></StyledView>
            {text &&
                <StyledView className='items-center px-[0.5vh]'>
                    <CaptionText>{text}</CaptionText>
                </StyledView>
            }
            {image &&
                <StyledView className='items-center px-[0.5vh]'>
                    <StyledImage source={image} className='w-[5vw] h-[5vw]'/>
                </StyledView>
            }
            <StyledView className='flex-1 h-[0.2vh] bg-gray-300'></StyledView>
        </StyledView>
    );
};
  
export default Divider;
