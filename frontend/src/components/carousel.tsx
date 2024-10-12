import Carousel from 'react-native-reanimated-carousel'
import React from 'react'
import { Dimensions, View } from 'react-native'

export default function GenericCarousel() {
    const width = Dimensions.get('window').width

    const list = [
        {
            id: 1,
            title: 'Title 1',
            image: 'https://picsum.photos/200/300'
        },
        {
            id: 2,
            title: 'Title 2',
            image: 'https://picsum.photos/200/300'
        }
    ]

    return (
        <View style={{ flex:1 }}>
            <Carousel
             width = {width}
             height = {width / 2}
             data = {list}/>
        </View>
    )
}