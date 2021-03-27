import React from 'react'
import { Pressable } from 'react-native'

export function Button ({
  children,
  style,
  onPress = () => {},
  disabled = false,
  visible = true
}) {
  return (
    <Pressable
      onPress={() => { if (visible && !disabled) onPress() }}
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