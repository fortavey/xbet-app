import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import THEME from '../data/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SettingsScreen({ navigation }) {
  const { lang, music, changeMusic } = useContext(LangContext)

  const openPolicy = () => {
    navigation.navigate('WebView', {
      source: `https://xbetapp1.com/privacy-policy-${lang.toLowerCase()}.html`,
      title: { RU: 'Политика конфиденциальности', EN: 'Privacy Policy' },
    })
  }

  const openSupport = () => {
    navigation.navigate('WebView', {
      source: `https://xbetapp1.com/support/`,
      title: { RU: 'Служба поддержки', EN: 'Support' },
    })
  }

  const text = {
    title: {
      RU: 'Настройки',
      EN: 'Settings',
    },
    policy: {
      RU: 'Политика конфиденциальности',
      EN: 'Privacy Policy',
    },
    support: {
      RU: 'Служба поддержки',
      EN: 'Support',
    },
    music: {
      RU: 'Звуки',
      EN: 'Sound',
    },
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: text.title[lang],
    })
  }, [navigation, lang])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ marginRight: 50 }}>
          <Text style={{ fontSize: 24 }}>{text.music[lang]}</Text>
        </View>
        <TouchableOpacity
          style={
            music === 'true'
              ? { ...styles.langBox, ...styles.currentBox }
              : { ...styles.langBox }
          }
          onPress={() => {
            AsyncStorage.setItem('@music', 'true')
            changeMusic('true')
          }}
        >
          <Text>ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            music === 'false'
              ? { ...styles.langBox, ...styles.currentBox }
              : { ...styles.langBox }
          }
          onPress={() => {
            AsyncStorage.setItem('@music', 'false')
            changeMusic('false')
          }}
        >
          <Text>OFF</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => openPolicy()} style={styles.item}>
        <Text>{text.policy[lang]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSupport()} style={styles.item}>
        <Text>{text.support[lang]}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50,
  },
  langBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'silver',
  },
  currentBox: {
    borderColor: THEME.MAIN_COLOR,
    backgroundColor: '#fff',
  },
  item: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
