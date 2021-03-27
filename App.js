import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Main } from './screens/main'
import { Chat } from './screens/chat'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { i18n } from './translations';
import { Keyboard } from 'react-native'

const Tab = createBottomTabNavigator();

export default function App() {
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
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#1c0f13',
        activeBackgroundColor: '#19401E',
        inactiveBackgroundColor: 'white',
        tabStyle: { borderRadius: 10, padding: 5, margin: 5 },
        labelStyle: { fontSize: 15 },
        style: { marginHorizontal: 20, borderRadius: 15, position: 'absolute', bottom: kbIsVisible ? -100 : 5, height: 70 }
      }}>
        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: i18n.t('bottomBar.main'),
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />
          }}
        />
        <Tab.Screen
          name="Services"
          component={Main}
          options={{
            tabBarLabel: i18n.t('bottomBar.services'),
            tabBarIcon: ({ color }) => <Feather name="grid" size={24} color={color} />
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: i18n.t('bottomBar.chat'),
            tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" size={24} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
