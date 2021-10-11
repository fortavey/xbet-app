import React, { useEffect, useCallback, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import { LangContext } from '../context/lang/langContext'
import { StatusBar } from 'expo-status-bar'
import THEME from '../data/colors'

export default function HomeScreen({ navigation }) {
  const { lang } = useContext(LangContext)

  const title = {
    RU: 'Главная',
    EN: 'Home',
  }
  const players = {
    RU: 'Игроки',
    EN: 'Players',
  }
  const teams = {
    RU: 'Команды',
    EN: 'Teams',
  }
  const championships = {
    RU: 'Чемпионаты',
    EN: 'Championships',
  }

  const image = require('../../assets/imageHome.jpg')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackVisible: false,
    })
  }, [navigation, lang])

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="light" backgroundColor={THEME.MAIN_COLOR} />
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <View style={styles.twoIcons}>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Question1', { type: 'players' })
            }
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../../assets/iconMain.png')}
            />
            <Text style={styles.itemText}>{players[lang]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Question1', { type: 'championships' })
            }
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../../assets/iconMain.png')}
            />
            <Text style={styles.itemText}>{championships[lang]}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneIcon}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Question1', { type: 'clubs' })}
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../../assets/iconMain.png')}
            />
            <Text style={styles.itemText}>{teams[lang]}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoIcons: {
    flexDirection: 'row',
  },
  oneIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingLeft: 5,
    paddingRight: 5,
  },
})
