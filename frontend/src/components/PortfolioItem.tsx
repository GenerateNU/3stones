import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { styled } from 'nativewind';


const StyledView = styled(View);
const StyledText = styled(Text);

interface PortfolioItemProps {
    address: string;
    location: string;
    price: number;
    duration: string;
    invested: number;
    completion: number;
    imageUrl: string;
}

const PortfolioItem = ({address, location, price, duration, invested, completion, imageUrl} : PortfolioItemProps )=> {
    return (
        <StyledView className = 'h-100 flex w-75 flex-col items-start p-6 rounded-[8px] border border-border bg-SurfaceFG'>
            <StyledView className = 'flex w-full min-w-38 flex-row items-start self-stretch'>
                {/* Left Side of the Card*/}
                <StyledView className = 'flex w-2/3 flex-col items-start'>
                    <StyledView className = 'flex flex-col items-start p-1 self-stretch space-y-2 mb-2'>
                        <StyledText className = 'sourceSans3BodyBold text-defaultText' >333 Market Street</StyledText>
                        <StyledText className = 'sourceSans3CaptionMedium text-defaultText' >San Francisco, CA</StyledText>
                        <StyledView className = 'py-3'>
                            <StyledText className = 'sourceSans3CaptionMedium text-defaultText' >Commercial Development</StyledText>
                        </StyledView>
                        <StyledView className="flex py-1 px-3 gap-1 items-center rounded-[8px] bg-border mb-3">
                            <StyledText className="caption-medium text-defaultText">Land Control Secured</StyledText>
                        </StyledView>
                        <StyledView className = 'flex flex-row items-start justify-between w-full mb-3'>
                            <StyledView className = 'flex justify-between items-start mr-4'>
                                <StyledText className = 'caption-medium text-defaultText' >Value</StyledText>
                                <StyledText className = 'body-medium text-defaultText' >$250.00</StyledText>
                            </StyledView>
                            <StyledView className = 'flex flex-col items-start'>
                                <StyledText className = 'caption-medium text-defaultText' >Exp Return</StyledText>
                                <StyledText className = 'body-medium text-defaultText' >5.12%</StyledText>
                            </StyledView>

                        </StyledView>
                    </StyledView>
                </StyledView>
                 {/* Right Side of the Card*/}
                <StyledView className = 'flex h-full w-1/3 items-start self-stretch'>
                    <StyledView className='w-full self-stretch rounded-full bg-center mb-4'>
                        <ImageBackground
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
                        </ImageBackground>
                    </StyledView>
                    <StyledView className = 'flex flex-col w-full justify-between items-end '>
                        <StyledText className = 'caption-medium text-defaultText' >Time Line</StyledText>
                        <StyledText className = 'body-medium text-defaultText' >6 Years</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default PortfolioItem;