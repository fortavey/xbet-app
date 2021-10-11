import React, { useState, useEffect, useCallback, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import THEME from '../data/colors'

export default function SettingsScreen({ navigation }) {
  const { lang, changeLang, fetchLang } = useContext(LangContext)

  const loadLang = useCallback(async () => await fetchLang(), [fetchLang])

  useEffect(() => {
    loadLang()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
