import React from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject, useProjectTotalFunded } from '../../services/project';

interface ProjectScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
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
    return (
        <StyledView className='flex-1 justify-center bg-surfaceBG items-stretch p-6 text-defaultText'>
            <StyledText className='text-2xl font-heading leading-8'>
                { firstTitle }
            </StyledText>
            <StyledView className='flex flex-row'>
                <StyledText className='flex-1 text-base leading-5 font-bodyBold'>
                    { secondTitle }
                </StyledText>
                <StyledView className='flex-1 flex-row items-center gap-2'>
                    <StyledView className='rounded-full w-3 h-3 bg-[#F7B418]' />
                    <StyledText className='font-bodyBold'>
                        Status:
                    </StyledText>
                    <StyledText className='font-body'>
                        { project.milestone }
                    </StyledText>
                </StyledView>
            </StyledView>
            <StyledView className='my-4 bg-[#E8E8E8] h-1 rounded-full'>
                {/* THIS IS RAISED PROGRESS NOT MILESTONE (thats what the status is for) */}
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

            <StyledTouchableOpacity className='bg-defaultPrimary rounded-full flex flex-row justify-center items-center h-10 p-3'>
                <Text style={{color: 'white'}}> {/* For some reason tailwindclasses doesnt work here*/}
                    Invest
                </Text>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className='border border-defaultPrimary rounded-full flex flex-row justify-center items-center h-10 mt-2 mb-6'>
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
        </StyledView>
    );
}
