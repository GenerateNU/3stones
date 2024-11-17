import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Button, DimensionValue, Dimensions, ScrollView } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useProject } from '../../services/project';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Zoomable } from '@likashefqet/react-native-image-zoom';

interface ProjectImagesScreenProps {
    // This actually should be `any`, so disabling the linter rule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: NavigationScreenProp<any, any>;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

export default function ProjectImagesScreen({ navigation }: ProjectImagesScreenProps) {
    const { project, isLoading } = useProject('c3733692-5a86-441f-8ad0-9c32c648bb72');
    const ref = React.useRef<ICarouselInstance>(null);
    
    const progress = useSharedValue<number>(0);

    if (isLoading) {
        return <Text>Loading ...</Text>
    }

    return (
        <StyledView className="flex flex-col h-full w-full">
            <StyledView className="w-full h-[400px]">
                <Carousel
                ref={ref}
                width={Dimensions.get("window").width}
                height={400}
                data={project.images}
                onProgressChange={(offsetProgress, absoluteProgress) => {
                    progress.value = absoluteProgress
                }}
                renderItem={({ item }) => (
                    <StyledView className='flex-1'>
                        <Zoomable>
                            <StyledImage
                                source={{ uri: item.url }} // replace with your image link
                                className="flex-1 object-cover rounded"
                                resizeMode="cover"
                            />
                        </Zoomable>
                    </StyledView>
                )}
                />
            </StyledView>
            
            <StyledScrollView className='px-6 mt-10' horizontal contentContainerStyle={{alignItems: 'stretch'}}>
                <StyledView className='flex flex-row w-full h-[72px] gap-x-4'>
                    {project.images.map((item, ind, arr) => (
                        <TouchableOpacity onPress={() => {ref.current?.scrollTo({ count: ind - progress.value, animated: true})}}>
                            <StyledView className="w-[72px] h-[72px]">
                                <StyledImage
                                    source={{ uri: item.url }} // replace with your image link
                                    className="flex-1 object-cover rounded"
                                    resizeMode="cover"
                                />
                            </StyledView>
                        </TouchableOpacity>
                    ))}
                </StyledView>
            </StyledScrollView>
        </StyledView>
    );
}
