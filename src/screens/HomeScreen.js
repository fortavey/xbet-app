import React, { useContext } from 'react'
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
import { getRandomObject } from '../functions/getRandomObject'

export default function HomeScreen({ navigation }) {
  const { lang, questions } = useContext(LangContext)

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

  const oneIcon = (type, title) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Question1', {
          obj: getRandomObject(questions.questions[type]),
          result: 0,
          page: 0,
        })
      }
    >
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/iconMain.png')}
      />
      <Text style={styles.itemText}>{title[lang]}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="light" backgroundColor={THEME.MAIN_COLOR} />
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <View style={styles.twoIcons}>
          {oneIcon('players', players)}
          {oneIcon('championships', championships)}
        </View>
        <View style={styles.oneIcon}>{oneIcon('clubs', teams)}</View>
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
