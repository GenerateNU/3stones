import React from 'react';
import { View, Text, ImageBackground, Image} from 'react-native';
import { styled } from 'nativewind';
import SideBySide from '../../../components/SideBySide';
import Tag from "../../../components/Tag"


const StyledView = styled(View);
const StyledText = styled(Text);

interface UpdateCardProps {
    topText: string;
    bottomText: string;
    status: string;
}

const UpdateCard = ({ topText, bottomText, status}: UpdateCardProps) => {
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
          leftComponent={
          <StyledView className = 'flex-col' >
              <StyledText className = 'font-sourceSans3Bold text-[16px]'> {topText}</StyledText>
              {status == "Sold" &&
              <Tag className = 'w-1/2' children = {<StyledText className="font-sourceSans3CaptionMedium text-defaultText text-white">
                  Sold</StyledText>} icon = {<Image source={require('../../../../assets/images/celebration.png')}></Image>} level = {'success'} >
              </Tag>
              }
              {status == "Construction Underway" &&
              <Tag children = {<StyledText className="font-sourceSans3CaptionMedium text-defaultText text-success">
                  Construction Underway</StyledText>} icon = {<Image source={require('../../../../assets/images/maps_home_work.png')}></Image>} level = {'successSubdued'} >
              </Tag>
              }
              {status == "Construction Complete" &&
              <Tag children = {<StyledText className="font-sourceSans3CaptionMedium text-success">
                  Construction Complete</StyledText>} icon = {<Image source={require('../../../../assets/images/house.png')}></Image>} level = {'successSubdued'} className = '' >
              </Tag>
              }
              {status == "Operational" &&
                <Tag className = 'w-3/4' children = {<StyledText className="font-sourceSans3CaptionMedium text-success">
                  Operational</StyledText>} icon = {<Image source={require('../../../../assets/images/maps_home_work.png')}></Image>} level = {'successSubdued'} >
                </Tag>
              }
              {status == "Construction Started" &&
                <Tag className = 'w-3/4' children = {<StyledText className="font-sourceSans3CaptionMedium text-gray-600">
                  Construction Started</StyledText>} icon = {<Image source={require('../../../../assets/images/handyman.png')}></Image>} level = {'neutralSubdued'} >
              </Tag>
              }
              {status == "Permitting Secured" &&
                <Tag className = 'w-3/4' children = {<StyledText className="font-sourceSans3CaptionMedium text-gray-600">
                  Permitting Secured</StyledText>} icon = {<Image source={require('../../../../assets/images/topic.png')}></Image>} level = {'neutralSubdued'} >
                </Tag>
              }
              {status == "Design Complete" &&
                <Tag className = 'w-3/4' children = {<StyledText className="font-sourceSans3CaptionMedium text-gray-600">
                  Design Complete</StyledText>} icon = {<Image source={require('../../../../assets/images/design_services.png')}></Image>} level = {'neutralSubdued'} >
                </Tag>
              }
              <StyledText className = 'font-sourceSans3Bold text-[16px]'> {bottomText}</StyledText>

          </StyledView>

          }
          rightComponent={''}
          spacing="mr-4"
          containerStyle="flex-1"
        />
      </StyledView>
    );
  };
  
export default UpdateCard;
