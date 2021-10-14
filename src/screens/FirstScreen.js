import React, { useState, useEffect, useCallback, useContext } from 'react'
import TrueScreen from '../screens/TrueScreen'
import requestSource from '../data/requestSource'
import { View, Image, StyleSheet } from 'react-native'
import THEME from '../data/colors'
import { LangContext } from '../context/lang/langContext'

export default function FirstScreen({ navigation }) {
  const { fetchLang, fetchMusic, changeQuestions } = useContext(LangContext)
  const loadLang = useCallback(async () => await fetchLang(), [fetchLang])
  const loadMusic = useCallback(async () => await fetchMusic(), [fetchMusic])

  const [returnView, setReturnView] = useState(
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/icon1.png')} />
    </View>
  )

  const fetchRequest = async () => {
    try {
      const res = await fetch(requestSource, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      changeQuestions(data)
      data.hasOwnProperty('url')
        ? setReturnView(<TrueScreen source={data.url} />)
        : navigation.navigate('Home')
    } catch (err) {
      navigation.navigate('Home')
    }
  }

  const loadRequest = useCallback(
    async () => await fetchRequest(),
    [fetchRequest]
  )

  useEffect(() => {
    loadRequest()
    loadLang()
    loadMusic()
  }, [])

  return returnView
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.MAIN_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
})
