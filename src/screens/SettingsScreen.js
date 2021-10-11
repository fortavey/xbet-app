import React, { useEffect, useCallback, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import THEME from '../data/colors'

export default function SettingsScreen({ navigation }) {
  const { lang } = useContext(LangContext)

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
