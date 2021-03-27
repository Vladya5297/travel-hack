import React from 'react'
import { Image, View, ScrollView, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { services } from '../data/services'
import { i18n } from '../translations'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Linking from 'expo-linking'

const Stack = createStackNavigator()

export function Services () {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Service" component={Service} />
    </Stack.Navigator>
  )
}

const stylesCards = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  grid: { flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  cardWrapper: { margin: 2 },
  cardImage: { width: 150, height: 150 },
  cardText: { position: 'absolute', top: 3, left: 3 }
})

export function Cards () {
  const footerHeight = useBottomTabBarHeight()
  return (
    <View style={stylesCards.wrapper}>
      <View style={stylesCards.grid}>
        {services[i18n.locale].map(({ name, img, data }) => {
          const navigation = useNavigation()
          return (
            <Button key={name} style={stylesCards.cardWrapper} onPress={() => {
              navigation.navigate('Service', { data, name })
            }}>
              <Image style={stylesCards.cardImage} source={img} />
              <Text style={stylesCards.cardText}>{name}</Text>
            </Button>
          )
        })}
      </View>
      <View style={{ height: footerHeight }} />
    </View>
  )
}

const stylesService = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  cardWrapper: { marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 10 },
  cardImage: { width: 280, height: 200, alignSelf: 'center', borderRadius: 7, marginBottom: 10 },
  cardName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  cardText: { position: 'absolute', top: 3, left: 3 },
  buttonWrapper: { alignItems: 'center' },
  button: { backgroundColor: '#19401E', padding: 10, borderRadius: 7, marginTop: 10 },
  buttonText: { color: 'white' },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
})

export function Service () {
  const { params } = useRoute()
  return (
    <ScrollView style={stylesService.wrapper}>
      <Text style={stylesService.header}>{params.name}</Text>
      {params.data.map(({ name, descriotion, img, url }) => (
        <View style={stylesService.cardWrapper} key={name}>
          <Image style={stylesService.cardImage} source={img}/>
          <Text style={stylesService.cardName}>{name}</Text>
          <Text>{descriotion}</Text>
          <View style={stylesService.buttonWrapper}>
            <Button style={stylesService.button} onPress={() => {
              Linking.openURL(url)
            }}>
              <Text style={stylesService.buttonText}>Подробнее</Text>
            </Button>
          </View>
        </View>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}