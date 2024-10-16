import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import { Dimensions, View } from 'react-native';

interface GenericCarouselProps {
  components: React.ReactNode[]; // ReactNode allows you to pass JSX elements
}

export default function GenericCarousel({ components }: GenericCarouselProps) {
  const width = Dimensions.get('window').width;

  /*
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
        */

  /*dataSet = {{ kind: "basic-layouts", name: "left-align"}}*/

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        width={width}
        height={width}
        data={components}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
            }}
          >
            {item}
          </View>
        )}
        scrollAnimationDuration={1000}
      />
    </View>
  );
}
