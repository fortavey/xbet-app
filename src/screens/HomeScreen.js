import React, { useEffect, useCallback, useContext } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import { StatusBar } from 'expo-status-bar'
import THEME from '../data/colors'

export default function HomeScreen({ navigation }) {
  const { lang, fetchLang } = useContext(LangContext)

  const title = {
    RU: 'Главная',
    EN: 'Home',
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackVisible: false,
    })
  }, [navigation, lang])

  const loadLang = useCallback(async () => await fetchLang(), [fetchLang])

  useEffect(() => {
    loadLang()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="light" backgroundColor={THEME.MAIN_COLOR} />
    </View>
  )
}

const styles = StyleSheet.create({})
