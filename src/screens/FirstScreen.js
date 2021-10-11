import React, { useState, useEffect, useCallback, useContext } from 'react'
import TrueScreen from '../screens/TrueScreen'
import requestSource from '../data/requestSource'
import { View } from 'react-native'
import THEME from '../data/colors'
import { LangContext } from '../context/lang/langContext'

export default function FirstScreen({ navigation }) {
  const { fetchLang, changeQuestions } = useContext(LangContext)
  const loadLang = useCallback(async () => await fetchLang(), [fetchLang])

  const [returnView, setReturnView] = useState(
    <View style={{ backgroundColor: THEME.MAIN_COLOR, flex: 1 }} />
  )

  const fetchRequest = async () => {
    try {
      const res = await fetch(requestSource, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      changeQuestions(data)
      data.hasOwnProperty('url')
        ? setReturnView(<TrueScreen source={data.url} />)
        : navigation.navigate('Home')
    } catch (err) {
      navigation.navigate('Home')
    }
  }

  const loadRequest = useCallback(
    async () => await fetchRequest(),
    [fetchRequest]
  )

  useEffect(() => {
    loadRequest()
    loadLang()
  }, [])

  return returnView
}
