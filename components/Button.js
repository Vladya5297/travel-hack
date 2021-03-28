import React from 'react'
import { Pressable } from 'react-native'
import * as Analytics from 'expo-firebase-analytics';

export function Button({
  children,
  style,
  onPress = () => { },
  disabled = false,
  visible = true
}) {
  return (
    <Pressable
      onPress={() => {
        if (visible && !disabled) {
          Analytics.logEvent('click', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
          onPress()
        }
      }}
      style={({ pressed }) => {
        let opacity
        if (!visible) {
          opacity = 0
        } else if (pressed || disabled) {
          opacity = 0.5
        } else {
          opacity = 1
        }
        return [
          style,
          { opacity }
        ]
      }}
    >
      {children}
    </Pressable>
  )
}