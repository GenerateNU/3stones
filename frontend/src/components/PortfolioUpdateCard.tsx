import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styled } from 'nativewind';
import UpdateText from './PortfolioUpdateText';
import SideBySide from './SideBySide';

const StyledView = styled(View);
const StyledText = styled(Text);

interface UpdateCardProps {
    topText: string;
    bottomText: string;
    quantity: string;
}

const UpdateCard = ({ topText, bottomText, quantity }: UpdateCardProps) => {
    return (
      <StyledView className="flex flex-row items-center justify-between p-2 w-full bg-surfaceFG overflow-hidden">
            <StyledView className="w-12 h-12 mr-2">
              <ImageBackground
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: 'lightgray',
                }}
              />
            </StyledView>
        <SideBySide
          leftComponent={<UpdateText topText={topText} bottomText={bottomText} />}
          rightComponent={<StyledText>{quantity}</StyledText>}
          spacing="mr-4"
          containerStyle="flex-1"
        />
      </StyledView>
    );
  };
  
export default UpdateCard;