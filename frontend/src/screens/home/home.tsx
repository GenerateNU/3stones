import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'

import styles from './styles'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Some dummy image */}
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/icon.png')} style={styles.imageStyle} />
      </View>
      {/* Some dummy button */}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
          <View>
            <Text style={styles.textStyle}>Dummy page</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
