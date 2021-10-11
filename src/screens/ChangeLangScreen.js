import React, { useState, useEffect, useCallback, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import THEME from '../data/colors'
import { StatusBar } from 'expo-status-bar'

export default function ChangeLangScreen({ navigation }) {
  const { lang, changeLang } = useContext(LangContext)

  const text = {
    RU: 'Русский язык',
    EN: 'English',
  }
  const save = {
    RU: 'Сохранить',
    EN: 'Save',
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" />
      <Text style={styles.text}>{text[lang]}</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={
            lang === 'EN'
              ? { ...styles.langBox, ...styles.currentBox }
              : { ...styles.langBox }
          }
          onPress={() => {
            AsyncStorage.setItem('@lang', 'EN')
            changeLang('EN')
          }}
        >
          <Text>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            lang === 'RU'
              ? { ...styles.langBox, ...styles.currentBox }
              : { ...styles.langBox }
          }
          onPress={() => {
            AsyncStorage.setItem('@lang', 'RU')
            changeLang('RU')
          }}
        >
          <Text>RU</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#fff' }}>{save[lang]}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 25,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  langBox: {
    width: 80,
    height: 80,
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
  saveBtn: {
    width: '40%',
    backgroundColor: THEME.MAIN_COLOR,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
})
