import React, { useReducer } from 'react'
import { CHANGE_LANG, CHANGE_QUESTIONS, CHANGE_MUSIC } from '../types'
import { LangContext } from './langContext'
import { langReducer } from './langReduser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import questionsArr from '../../data/questionArr'

export const LangState = ({ children }) => {
  const initialState = {
    lang: 'RU',
    music: 'true',
    questions: questionsArr,
  }
  const [state, dispatch] = useReducer(langReducer, initialState)

  const changeLang = (lang) => dispatch({ type: CHANGE_LANG, lang })
  const changeMusic = (music) => dispatch({ type: CHANGE_MUSIC, music })
  const changeQuestions = (questions) => {
    dispatch({ type: CHANGE_QUESTIONS, questions })
  }

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

  const fetchMusic = (music) => {
    const getMusic = async (music) => {
      try {
        const value = await AsyncStorage.getItem('@music')
        if (value !== null) {
          changeMusic(value)
        } else {
          await AsyncStorage.setItem('@music', 'true')
        }
      } catch (e) {
        console.log(e)
      }
    }
    getMusic(music)
  }

  return (
    <LangContext.Provider
      value={{
        lang: state.lang,
        music: state.music,
        questions: state.questions,
        changeLang,
        changeMusic,
        fetchLang,
        fetchMusic,
        changeQuestions,
      }}
    >
      {children}
    </LangContext.Provider>
  )
}
