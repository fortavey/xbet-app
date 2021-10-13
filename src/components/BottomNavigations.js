import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import THEME from '../data/colors'
import { AntDesign } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'

export default function BottomNavigations({ navigation, moveForward }) {
  return (
    <View style={styles.bottomNavigations}>
      <TouchableOpacity
        style={{
          ...styles.bottomNavigationItem,
          borderColor: '#fff',
          borderRightWidth: 2,
        }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.bottomNavigationItemText}>
          <AntDesign name="home" size={24} color="#fff" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.bottomNavigationItem,
          borderColor: '#fff',
          borderLeftWidth: 2,
        }}
        onPress={() => moveForward()}
      >
        <Text style={styles.bottomNavigationItemText}>
          <Foundation name="next" size={24} color="#fff" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNavigations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomNavigationItem: {
    width: '49%',
    minHeight: 70,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomNavigationItemText: {
    color: '#fff',
  },
})
