import React, { useEffect, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  img: {
    position: 'absolute'
  }
})

export function Start () {
  const navigation = useNavigation()
  const { width } = Dimensions.get('window')

  const logo = useRef(new Animated.Value(0)).current
  const front = useRef(new Animated.Value(0)).current
  const back = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logo, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: false
      }),
      Animated.timing(front, {
        toValue: 1,
        duration: 1300,
        delay: 500,
        useNativeDriver: false
      }),
      Animated.timing(back, {
        toValue: 1,
        duration: 1400,
        delay: 500,
        useNativeDriver: false
      })
    ]).start(() => {
      navigation.replace('Application')
    })
  }, [])

  return (
    <View style={styles.wrapper}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={StyleSheet.compose(styles.img, {
          left: (width / 2) - (163 / 2),
          top: logo.interpolate({
            inputRange: [0, 1],
            outputRange: [-160, 0]
          })
        })}
      />
      <Animated.Image
        source={require('../assets/front.png')}
        style={StyleSheet.compose(styles.img, {
          height: 400,
          width: 400,
          bottom: front.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, 0]
          })
        })}
      />
      <Animated.Image
        source={require('../assets/backbuild.png')}
        style={StyleSheet.compose(styles.img, {
          height: 450,
          width: 400,
          bottom: back.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, -30]
          })
        })}
      />
    </View>
  )
}