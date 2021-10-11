import React, { useReducer } from 'react'
import { CHANGE_LANG, FETCH_LANG } from '../types'
import { LangContext } from './langContext'
import { langReducer } from './langReduser'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const LangState = ({ children }) => {
  const initialState = {
    lang: 'RU',
  }
  const [state, dispatch] = useReducer(langReducer, initialState)

  const changeLang = (lang) => dispatch({ type: CHANGE_LANG, lang })

  const fetchLang = (lang) => {
    const getLang = async (lang) => {
      try {
        const value = await AsyncStorage.getItem('@lang')
        if (value !== null) {
          changeLang(value)
        } else {
          await AsyncStorage.setItem('@lang', 'RU')
        }
      } catch (e) {
        console.log(e)
      }
    }
    getLang(lang)
  }

  return (
    <LangContext.Provider
      value={{
        lang: state.lang,
        changeLang,
        fetchLang,
      }}
    >
      {children}
    </LangContext.Provider>
  )
}
