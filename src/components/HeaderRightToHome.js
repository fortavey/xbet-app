import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'

export default function HeaderRightToHome({ navigation }) {
  return (
    <View style={styles.container}>
      <AntDesign
        name="home"
        size={24}
        color="#fff"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
