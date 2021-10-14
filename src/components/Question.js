import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import THEME from '../data/colors'
import { moveForwardAlert } from '../data/alert'
import BottomNavigations from './BottomNavigations'
import { Audio } from 'expo-av'

export default function Question({ route, navigation }) {
  const [sound, setSound] = useState()
  const { lang, music } = useContext(LangContext)
  const [bgColor0, setBgColor0] = useState(THEME.MAIN_COLOR)
  const [bgColor1, setBgColor1] = useState(THEME.MAIN_COLOR)
  const [bgColor2, setBgColor2] = useState(THEME.MAIN_COLOR)
  const [bgColor3, setBgColor3] = useState(THEME.MAIN_COLOR)
  const [firstAnswer, setFirstAnswer] = useState(false)
  const { result, page, obj } = route.params
  const [res, setRes] = useState(result)
  const [p, setP] = useState(page + 1)
  const [currentQuestion, setCurrentQuestion] = useState(obj[page])
  const answer = currentQuestion.answer

  async function playSound(success) {
    const path = success
      ? require('../../assets/success.mp3')
      : require('../../assets/fale1.mp3')
    const { sound } = await Audio.Sound.createAsync(path)
    setSound(sound)

    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const title = {
    RU: 'Вопрос ' + p,
    EN: 'Question ' + p,
  }
  const next = p + 1
  const nextScreen = next <= 3 ? 'Question' + next : 'Result'

  const moveForward = () => {
    if (firstAnswer) {
      navigation.navigate(nextScreen, {
        obj: obj,
        result: res,
        page: p,
      })
    } else {
      moveForwardAlert(Alert, lang)
    }
  }

  const pushAnswer = (num) => {
    const color = setAnswer(num)
    changeAnswerColor(num, color)
  }

  const setAnswer = (num) => {
    let color = ''
    if (!firstAnswer) {
      setFirstAnswer(true)
      if (num === answer) {
        music === 'true' ? playSound(true) : null
        color = 'green'
        setRes(res + 1)
      } else {
        music === 'true' ? playSound(false) : null
        color = 'red'
      }
    } else {
      color = num === answer ? 'green' : 'red'
    }
    return color
  }

  const changeAnswerColor = (num, color) => {
    switch (num) {
      case 0:
        setBgColor0(color)
        break
      case 1:
        setBgColor1(color)
        break
      case 2:
        setBgColor2(color)
        break
      case 3:
        setBgColor3(color)
        break
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackVisible: false,
    })
  }, [navigation, lang])

  const oneAnswer = (n, bgColor) => (
    <TouchableOpacity
      style={{ ...styles.answerItem, backgroundColor: bgColor }}
      onPress={() => pushAnswer(n)}
    >
      <Text style={styles.answerText}>{currentQuestion[lang].answers[n]}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.questionTitle}>{currentQuestion[lang].question}</Text>
      <View style={styles.answersBlock}>
        {oneAnswer(0, bgColor0)}
        {oneAnswer(1, bgColor1)}
        {oneAnswer(2, bgColor2)}
        {oneAnswer(3, bgColor3)}
      </View>
      <BottomNavigations navigation={navigation} moveForward={moveForward} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 50,
    marginTop: 100,
    textAlign: 'center',
  },
  answersBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  answerItem: {
    width: '45%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  answerText: {
    color: '#fff',
  },
})
