import React, { useState, useEffect, useRef } from 'react'
import { Keyboard, View } from 'react-native'
import { GiftedChat, Bubble, MessageText, Time } from 'react-native-gifted-chat'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const ip = '10.0.3.125'

export function Chat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  const ws = useRef(new WebSocket(`ws://${ip}:5000`)).current

  useEffect(() => {
    ws.onmessage = ({ data }) => {
      const { initial, message } = JSON.parse(data)
      setMessages(messages => initial ? message : [message, ...messages])
    }
  }, [])

  const onSend = ([message]) => {
    setMessages(messages => [message, ...messages])
    ws.send(JSON.stringify({ message }))
  }

  const footerHeight = useBottomTabBarHeight()

  const [kbIsVisible, setKbIsVisible] = useState(false)

  useEffect(() => {
    const onShow = () => {
      setKbIsVisible(true)
    }
    const onHide = () => {
      setKbIsVisible(false)
    }
    Keyboard.addListener('keyboardDidShow', onShow)
    Keyboard.addListener('keyboardDidHide', onHide)
    return () => {
      Keyboard.removeListener('keyboardDidShow', onShow)
      Keyboard.addListener('keyboardDidHide', onHide)
    }
  }, [])

  return (
    <>
      <GiftedChat
        text={text}
        onInputTextChanged={text => setText(text)}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 'generate' }}
        renderAvatar={null}
        renderBubble={(props) => <Bubble {...props} wrapperStyle={{
          right: { backgroundColor: '#19401E' },
          left: { backgroundColor: '#B99F5E' }
        }}/>}
        renderMessageText={(props) => <MessageText {...props} textStyle={{ left: { color: 'white' } }} />}
        renderTime={(props) => <Time {...props} timeTextStyle={{ left: { color: 'white' } }} />}
      />
      <View style={{ height: kbIsVisible ? 0 : footerHeight + 15, borderTopColor: '#dbdbdb', borderTopWidth: 1 }}/>
    </>
  )
}