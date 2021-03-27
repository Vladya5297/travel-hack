import React from 'react'
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Main } from './screens/main'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { i18n } from './translations';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#1c0f13',
        activeBackgroundColor: '#19401E',
        inactiveBackgroundColor: 'white',
        tabStyle: { borderRadius: 10, padding: 10 },
        labelStyle: { fontSize: 15 },
        style: { marginHorizontal: 20, borderRadius: 10, position: 'absolute', bottom: 5, height: 70 }
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
          component={Main}
          options={{
            tabBarLabel: i18n.t('bottomBar.chat'),
            tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" size={24} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
