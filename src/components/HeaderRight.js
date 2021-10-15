import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'

export default function HeaderRight({ navigation }) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="language"
        size={24}
        onPress={() => navigation.navigate('ChangeLang')}
        color="#fff"
        style={styles.item}
      />
      <Ionicons
        name="settings-outline"
        size={24}
        color="#fff"
        onPress={() => navigation.navigate('Settings')}
        style={{ ...styles.item, marginRight: 0 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    marginRight: 20,
  },
})
