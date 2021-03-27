import React, { useState, useEffect, useRef } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const ip = '192.168.0.15'

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

  return (
    <GiftedChat
      text={text}
      onInputTextChanged={text => setText(text)}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 'generate' }}
      renderAvatar={null}
    />
  )
}