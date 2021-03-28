import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  Switch
} from 'react-native'
import { Button } from '../components/Button'
import { EvilIcons } from '@expo/vector-icons'
import { i18n } from '../translations'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { news } from '../data/news'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import { tour } from '../data/tour.json'
import * as Linking from 'expo-linking'

const Stack = createStackNavigator()

export function Main () {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="TourItem" component={TourItem} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  search: {
    flex: 1,
    padding: 5,
    fontSize: 20
  },
  toursWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tourBackground: {
    borderRadius: 10,
    width: 120,
    height: 100
  },
  tourText: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    color: 'white',
    maxWidth: 130
  },
  activityWrapper: {
    marginBottom: 10
  },
  cardWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 5
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 10
  },
  cardTextWrapper: {
    padding: 5,
    width: 200
  },
  cardName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 15
  },
  loadMoreWrapper: {
    alignItems: 'center'
  },
  loadMoreButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#19401E',
    width: '60%',
    borderRadius: 5,
    borderColor: 'black'
  },
  loadMoreText: {
    color: 'white',
    fontSize: 15
  }
})

const tours = {
  en: [
    {
      name: 'Food tour',
      img: require('../assets/food.png')
    },
    {
      name: 'Metropol tour',
      img: require('../assets/metropol.png')
    },
    {
      name: 'Cultural tour',
      img: require('../assets/cultural.png')
    },
    {
      name: 'Water tour',
      img: require('../assets/water.png')
    },
    {
      name: 'Joy tour',
      img: require('../assets/joy.png')
    }
  ],
  'ru-RU': [
    {
      name: 'Гастро тур',
      img: require('../assets/food.png')
    },
    {
      name: 'Метрополь тур',
      img: require('../assets/metropol.png')
    },
    {
      name: 'Светский тур',
      img: require('../assets/cultural.png')
    },
    {
      name: 'Водный тур',
      img: require('../assets/water.png')
    },
    {
      name: 'Развлекательный',
      img: require('../assets/joy.png')
    }
  ]
}

export function News () {
  const footerHeight = useBottomTabBarHeight()
  const [isEn, setIsEn] = useState(i18n.currentLocale() === 'en' ? true : false);
  const toggleSwitch = () => setIsEn(previousState => { 
    const newState = !previousState
    i18n.locale = newState ? 'en' : 'ru-RU'
    return newState
  })
  return (
    <ScrollView style={styles.scrollWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>{i18n.t('headers.main')}</Text>
          <View style={styles.toggle}>
            <Text>Ru</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#767577' }}
              thumbColor={'#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEn}
            />
            <Text>En</Text>
          </View>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.search} placeholder={i18n.t('search') + '...'} />
          <EvilIcons name="search" size={30} color="black" style={{ backgroundColor: 'white'}}/>
        </View>
        <ScrollView style={styles.toursWrapper} horizontal={true} fadingEdgeLength={20}>
          {tours[i18n.currentLocale()].map(({ name, img }) => {
            const navigation = useNavigation()
            return (
              <Button key={name} style={{ margin: 5 }} onPress={() => {
                navigation.navigate('TourItem')
              }}>
                <Image style={styles.tourBackground} source={img}></Image>
                <Text style={styles.tourText}>{name}</Text>
              </Button>
              )
          })}
        </ScrollView>
        <View style={styles.activityWrapper}>
          <Text style={styles.header}>{i18n.t('headers.activity')}</Text>
          {news[i18n.currentLocale()].map(({ title, short, url, img }) => {
            return (
              <Button key={title} style={styles.cardWrapper} onPress={() => {
                Linking.openURL(url)
              }}>
                <Image source={img} style={styles.cardImage}/>
                <View style={styles.cardTextWrapper}>
                  <Text style={styles.cardName}>{title}</Text>
                  <Text style={styles.cardDescription}>{short}</Text>
                </View>
              </Button>
            )
          })}
        </View>
        <View style={styles.loadMoreWrapper}>
          <Button  style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>{i18n.t('loadMore')}</Text>
          </Button>
        </View>
        <View style={{ height: footerHeight }} />
      </View>
    </ScrollView>
  )
}

const stylesTourItem = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  image: {
    resizeMode: 'stretch',
    width: 280,
    height: 200,
    alignSelf: 'center',
    borderRadius: 8
  },
  description: {
    marginTop: 10,
    fontSize: 15
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10
  }
})

export function TourItem () {
  const { name, description } = tour[i18n.currentLocale()]
  return (
    <ScrollView style={stylesTourItem.wrapper}>
      <Text style={stylesTourItem.header}>{name}</Text>
      <View style={stylesTourItem.card}>
        <Image style={stylesTourItem.image} source={require('../assets/thebestimageintheworld.png')}/>
        <Text style={stylesTourItem.description}>{description}</Text>
      </View>
    </ScrollView>
  )
}