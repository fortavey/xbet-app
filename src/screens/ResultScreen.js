import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Question3Screen({ route, navigation }) {
  const { result } = route.params
  return (
    <View style={styles.container}>
      <Text>{result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
