import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image
} from 'react-native'
import { Button } from '../components/Button'
import { EvilIcons } from '@expo/vector-icons'
import { i18n } from '../translations'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { news } from '../data/news'

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
  VIP: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B99F5E',
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


const tours = [
  {
    name: i18n.t('tours.food'),
    img: require('../assets/food.png')
  },
  {
    name: i18n.t('tours.metropol'),
    img: require('../assets/metropol.png')
  },
  {
    name: i18n.t('tours.cultural'),
    img: require('../assets/cultural.png')
  },
  {
    name: i18n.t('tours.water'),
    img: require('../assets/water.png')
  },
  {
    name: i18n.t('tours.joy'),
    img: require('../assets/joy.png')
  }
]

export function Main () {
  const footerHeight = useBottomTabBarHeight()
  return (
    <ScrollView style={styles.scrollWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>{i18n.t('headers.main')}</Text>
          <Button style={styles.VIP}>
            <Text style={StyleSheet.compose(styles.header, { color: 'white', fontSize: 15 })}>VIP</Text>
          </Button>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.search} placeholder={i18n.t('search') + '...'} />
          <EvilIcons name="search" size={30} color="black" style={{ backgroundColor: 'white'}}/>
        </View>
        <ScrollView style={styles.toursWrapper} horizontal={true} fadingEdgeLength={20}>
          {tours.map(({ name, img }) => (
            <Button key={name} style={{ margin: 5 }}>
              <Image style={styles.tourBackground} source={img}></Image>
              <Text style={styles.tourText}>{name}</Text>
            </Button>
          ))}
        </ScrollView>
        <View style={styles.activityWrapper}>
          <Text style={styles.header}>{i18n.t('headers.activity')}</Text>
          {news[i18n.locale].map(({ title, short, long, img }) => (
            <Button key={title} style={styles.cardWrapper}>
              <Image source={img} style={styles.cardImage}/>
              <View style={styles.cardTextWrapper}>
                <Text style={styles.cardName}>{title}</Text>
                <Text style={styles.cardDescription}>{short}</Text>
              </View>
            </Button>
          ))}
        </View>
        <View style={styles.loadMoreWrapper}>
          <Button  style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Загрузить больше</Text>
          </Button>
        </View>
        <View style={{ height: footerHeight }} />
      </View>
    </ScrollView>
  )
}
