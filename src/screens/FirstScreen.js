import React, { useState, useEffect, useCallback } from 'react'
import HomeScreen from '../screens/HomeScreen'
import TrueScreen from '../screens/TrueScreen'
import questionArr from '../data/questionArr'
import requestSource from '../data/requestSource'
import { View } from 'react-native'

export default function FirstScreen({ navigation }) {
  const [questions, setQuestions] = useState(questionArr)
  const [returnView, setReturnView] = useState(<View />)

  const fetchRequest = async () => {
    try {
      const res = await fetch(requestSource, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      setQuestions(data)
      data.hasOwnProperty('url')
        ? setReturnView(<TrueScreen source={data.url} />)
        : navigation.navigate('Home')
    } catch (err) {
      setReturnView(<HomeScreen questions={questions} />)
    }
  }

  const loadRequest = useCallback(
    async () => await fetchRequest(),
    [fetchRequest]
  )

  useEffect(() => {
    loadRequest()
  }, [])

  return returnView
}
