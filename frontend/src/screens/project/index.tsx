import React from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue, ScrollView } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';

interface ProjectScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ProjectScreen({ navigation }: ProjectScreenProps) {
    const { project, isLoading } = useProject('c3733692-5a86-441f-8ad0-9c32c648bb72');
    const { projectTotalFunded, isLoading: isProjectTotalFundedLoading } = useProjectTotalFunded('c3733692-5a86-441f-8ad0-9c32c648bb72');

    if (isLoading || isProjectTotalFundedLoading) {
        return <Text>Loading ...</Text>
    }

    const firstTitle = `${project.premise} ${project.street}`
    const secondTitle = `${project.locality}, ${project.state}`
    
    const formatCents = (x: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(x / 100);
    }

    const fundingProgress: DimensionValue = `${(projectTotalFunded / project.funding_goal_cents).toFixed(0)}%` as DimensionValue;

    const propertyDetails = [
        ["Property Type", "Residential"],
        ["Investment Strategy", "Value-Add"],
        ["Investment Type", "Equity"],
        ["Estimated First Distribution", "8/2025"],
        ["Estimated Hold Period", "20 Months"]
    ];

    const numberOfImages = project.images.length;
    const imageButtonText = numberOfImages > 20 ? "20+ Images" : `${numberOfImages} Images`

    return (
        <StyledScrollView className='flex-1 bg-surfaceBG p-6 text-defaultText' contentContainerStyle={{alignItems: 'stretch'}}>
            <StyledTouchableOpacity className='flex flex-row h-32 w-full' onPress={(evt) => { navigation.navigate('project-images')}}>
                <StyledView className='flex-grow bg-red-100 mr-2'>
                    <StyledImage
                        source={{ uri: project.images[0 % numberOfImages].url }} // replace with your image link
                        className="flex-1 object-cover rounded"
                        resizeMode="cover"
                    />
                </StyledView>
                <StyledView className='flex flex-col flex-grow ml-2'>
                    <StyledImage
                        source={{ uri: project.images[1 % numberOfImages].url }} // replace with your image link
                        className="flex-1 object-cover mb-2 rounded"
                        resizeMode="cover"
                    />
                    <StyledView className='flex-1 object-cover mt-2 rounded bg-green-500'>
                        <StyledImage
                            source={{ uri: project.images[2 % numberOfImages].url }} // replace with your image link
                            className="w-full h-full object-cover rounded"
                            resizeMode="cover"
                        />
                        
                        <StyledView className="absolute inset-0 bg-gray-800 opacity-50 w-full h-full rounded" />

                        <StyledView className="absolute inset-0 flex items-center justify-center w-full h-full">
                            <StyledText className="text-sm font-body" style={{color: '#F3F3F3'}}>{imageButtonText}</StyledText>
                        </StyledView>
                    </StyledView>
                    
                </StyledView>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className='my-6 h-16 w-full bg-yellow-600 rounded' onPress={(evt) => { navigation.navigate('project-map') }}>
                <Text>
                    Map view
                </Text>
            </StyledTouchableOpacity>
            <StyledText className='text-2xl font-heading leading-8'>
                { firstTitle }
            </StyledText>
            <StyledView className='flex flex-row justify-between'>
                <StyledText className='text-base leading-5 font-bodyBold'>
                    { secondTitle }
                </StyledText>
                <StyledView className='flex-row items-center gap-2'>
                    <StyledView className='rounded-full w-3 h-3 bg-[#F7B418]' />
                    <StyledText className='font-bodyBold'>
                        Status:
                    </StyledText>
                    <StyledText className='font-body'>
                        In Progress
                    </StyledText>
                </StyledView>
            </StyledView>
            <StyledView className='my-4 bg-[#E8E8E8] h-1 rounded-full'>
                <StyledView className='bg-defaultPrimary h-full rounded-full' style={{ width: fundingProgress }}/>
            </StyledView>
            <StyledView className='flex flex-row font-body text-defaultText text-xs leading-3 mb-6'>
                <StyledText className='flex-1'>
                    Raised: { isProjectTotalFundedLoading ? "Loading..." : formatCents(projectTotalFunded) }
                </StyledText>
                <StyledText className='flex-1 text-right'>
                    Goal: {formatCents(project.funding_goal_cents)}
                </StyledText>
            </StyledView>

            <StyledTouchableOpacity className='bg-defaultPrimary rounded-full flex flex-row justify-center items-center h-10 p-3' onPress={(evt) => { navigation.navigate('project-invest') }}>
                <Text style={{color: 'white'}}> {/* For some reason tailwindclasses doesnt work here*/}
                    Invest
                </Text>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className='border border-defaultPrimary rounded-full flex flex-row justify-center items-center h-10 mt-2 mb-6' onPress={(evt) => { navigation.navigate('project-updates') }}>
                <Text style={{color: '#285852'}}> {/* For some reason tailwindclasses doesnt work here*/}
                    Updates
                </Text>
            </StyledTouchableOpacity>

            <StyledText className="text-defaultText font-bodyBold text-lg leading-6">
                Description
            </StyledText>

            <StyledText className='font-body text-base leading-5'>
                {project.description}
            </StyledText>

            <StyledView className='w-full h-[1px] my-6 bg-border' />

            <StyledView className='flex flex-col gap-y-2'>
                {propertyDetails.map((val, idx, arr) => (
                    <StyledView className='flex flex-row justify-between'>
                        <StyledText className='font-bodyBold text-base'>
                            {val[0]}
                        </StyledText>
                        <StyledText className='font-body text-base'>
                            {val[1]}
                        </StyledText>
                    </StyledView>
                ))}
            </StyledView>
        </StyledScrollView>
    );
}
