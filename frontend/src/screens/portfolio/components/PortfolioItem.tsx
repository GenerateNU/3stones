import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import Card from "../../../components/Card"
import Tag from "../../../components/Tag"



const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface PortfolioItemProps {
    address: string;
    location: string;
    description: string;
    initialValue: number;
    finalValue: number;
    image: React.ReactNode;
    status: string;
}

const PortfolioItem = ({address, location, description, initialValue, finalValue, image, status} : PortfolioItemProps & { className?: string })=> {
    return (
        <Card className = 'h-100'>
            <StyledView className = 'flex w-full min-w-38 flex-row items-start self-stretch'>
                {/* Left Side of the Card*/}
                <StyledView className = 'flex w-2/3 flex-col items-start'>
                    <StyledView className = 'flex flex-col items-start p-1 self-stretch space-y-2 mb-2'>
                        <StyledText className = 'font-sourceSans3Bold text-[16px]' >{address}</StyledText>
                        <StyledText className = 'font-sourceSans3CaptionMedium text-[12px]' >{location}</StyledText>
                        <StyledView className = 'py-3'>
                            <StyledText className = 'font-sourceSans3CaptionMedium text-[12px]' >{description}</StyledText>
                        </StyledView>
                        <StyledView>
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
                        </StyledView>

                        <StyledView className = 'flex flex-row items-start justify-between w-full mb-3'>
                            <StyledView className = 'flex justify-between items-start mr-4'>
                                <StyledText className = 'font-sourceSans3CaptionMedium text-[12px]' >Final Value</StyledText>
                                <StyledText className = 'font-sourceSans3BodyBold text-[16px]' >{finalValue}</StyledText>
                            </StyledView>
                            <StyledView className = 'flex flex-col items-start'>
                                <StyledText className = 'font-sourceSans3CaptionMedium text-[12px]' >Initial Value</StyledText>
                                <StyledText className = 'font-sourceSans3BodyBold text-[16px]' >{initialValue}</StyledText>
                            </StyledView>

                        </StyledView>
                    </StyledView>
                </StyledView>
                 {/* Right Side of the Card*/}
                <StyledView className = 'flex h-full w-1/3 items-start self-stretch'>
                    <StyledView className='w-full self-stretch rounded-full bg-center mb-4'>
                        
                        
                        {/*<ImageBackground
                            source={{
                                uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4638f60-ecd7-4228-b667-e7628252709e/dgvsziv-91c4e37f-2e85-4213-a48b-d61c1b519d1d.png/v1/fill/w_717,h_999/spongebob_s_pineapple_house_by_disneycrossover143_dgvsziv-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTk5IiwicGF0aCI6IlwvZlwvZTQ2MzhmNjAtZWNkNy00MjI4LWI2NjctZTc2MjgyNTI3MDllXC9kZ3Zzeml2LTkxYzRlMzdmLTJlODUtNDIxMy1hNDhiLWQ2MWMxYjUxOWQxZC5wbmciLCJ3aWR0aCI6Ijw9NzE3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.dnqjq9N0a7uHiyB8t4apr5-VCAeZOfSJvtVDdPtdz3E',
                            }}
                            style={{
                                height: 135,
                                alignSelf: 'stretch',
                                borderRadius: 4, 
                                overflow: 'hidden', 
                                backgroundColor: 'lightgray', 
                            }}>                       
                        </ImageBackground> */}

                        {image}
                    </StyledView>
                    <StyledView className = 'flex flex-col w-full py-1 justify-between items-end '>
                        <StyledText className = 'font-sourceSans3CaptionMedium text-[12px]' >Total Returns</StyledText>
                        <StyledText className = 'font-sourceSans3BodyBold text-[16px]' >{((finalValue - initialValue)/initialValue) * 100}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </Card>
    );
};

export default PortfolioItem;
