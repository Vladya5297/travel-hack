import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30 // 10
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
    flexDirection: 'row'
  },
  tourBackground: {
    borderRadius: 10,
    width: 150,
    height: 150
  },
  tourText: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    color: 'white',
    maxWidth: 130
  }
})

function Button ({
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

const tours = [
  {
    name: 'Гастро тур',
    img: require('./assets/food.png')
  },
  {
    name: 'Метрополь тур',
    img: require('./assets/metropol.png')
  },
  {
    name: 'Светский тур',
    img: require('./assets/cultural.png')
  },
  {
    name: 'Водный тур',
    img: require('./assets/water.png')
  },
  {
    name: 'Развлекательный',
    img: require('./assets/joy.png')
  }
]

export default function App() {
  return (
    <ScrollView style={styles.scrollWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Главная</Text>
          <Button style={styles.VIP}>
            <Text style={StyleSheet.compose(styles.header, { color: 'white', fontSize: 15 })}>VIP</Text>
          </Button>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.search} placeholder={'Поиск...'} />
          <EvilIcons name="search" size={30} color="black" style={{ backgroundColor: 'white'}}/>
        </View>
        <ScrollView style={styles.toursWrapper} horizontal={true} fadingEdgeLength={20}>
          {tours.map(({ name, img }) => (
            <Button key={name} style={{ margin: 10 }}>
              <Image style={styles.tourBackground} source={img}></Image>
              <Text style={styles.tourText}>{name}</Text>
            </Button>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}
