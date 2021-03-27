import React, { useEffect, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  img: {
    position: 'absolute'
  }
})

export function Start () {
  const { height, width } = Dimensions.get('window')

  const logo = useRef(new Animated.Value(0)).current
  const leftHand = useRef(new Animated.Value(0)).current
  const rightHand = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logo, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: false
      }),
      Animated.timing(leftHand, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: false
      }),
      Animated.timing(rightHand, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: false
      })
    ]).start()
  }, [])

  return (
    <View style={styles.wrapper}>
      <Animated.Image
        source={require('./assets/logo.png')}
        style={StyleSheet.compose(styles.img, {
          left: (width / 2) - (163 / 2),
          top: logo.interpolate({
            inputRange: [0, 1],
            outputRange: [-160, 0]
          })
        })}
      />
      <Animated.Image
        source={require('./assets/lhand.png')}
        style={StyleSheet.compose(styles.img, {
          top: (height / 2) - (40 / 2),
          left: leftHand.interpolate({
            inputRange: [0, 1],
            outputRange: [-190, 0]
          })
        })}
      />
      <Animated.Image
        source={require('./assets/rhand.png')}
        style={StyleSheet.compose(styles.img, {
          top: (height / 2) - (105 / 2),
          right: rightHand.interpolate({
            inputRange: [0, 1],
            outputRange: [-190, 0]
          })
        })}
      />
    </View>
  )
}