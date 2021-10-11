import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import THEME from '../data/colors'
import { AntDesign } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'

export default function Question1Screen({ route, navigation }) {
  const { lang, questions } = useContext(LangContext)
  const [result, setResult] = useState(['0'])
  const [bgColor0, setBgColor0] = useState(THEME.MAIN_COLOR)
  const [bgColor1, setBgColor1] = useState(THEME.MAIN_COLOR)
  const [bgColor2, setBgColor2] = useState(THEME.MAIN_COLOR)
  const [bgColor3, setBgColor3] = useState(THEME.MAIN_COLOR)
  const [firstAnswer, setFirstAnswer] = useState(false)

  console.log(questions)

  const { type } = route.params
  const page = 1
  const currentQuestion = questions.questions[type][page - 1][lang]

  const title = {
    RU: 'Вопрос ' + page,
    EN: 'Question ' + page,
  }
  const alertTitle = {
    RU: 'Выберите вариант ответа',
    EN: 'Choose answer',
  }
  const alertText = {
    RU: 'Вы не можете перейти к следующему вопросу. Необходимо дать ответ на текущий вопрос',
    EN: 'You cannot go to the next question. It is necessary to answer the current question',
  }
  const cancelText = {
    RU: 'Отмена',
    EN: 'Cancel',
  }

  const createTwoButtonAlert = () => {
    Alert.alert(alertTitle[lang], alertText[lang], [
      {
        text: cancelText[lang],
        style: 'cancel',
      },
      { text: 'OK' },
    ])
  }

  const moveForward = () => {
    if (firstAnswer) {
      navigation.navigate('Question2', { type: 'clubs', res: result })
    } else {
      createTwoButtonAlert()
    }
  }

  const pushAnswer = (num) => {
    let color = ''
    if (!firstAnswer) {
      setFirstAnswer(true)
      if (num === questions.questions[type][page - 1].answer) {
        color = 'green'
        const newArr = [...result]
        newArr.push('1')
        setResult(newArr)
      } else {
        color = 'red'
        const newArr = [...result]
        newArr.push('0')
        setResult(newArr)
      }
    } else {
      if (num === questions.questions[type][page - 1].answer) {
        color = 'green'
      } else {
        color = 'red'
      }
    }

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
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.questionTitle}>{currentQuestion.question}</Text>
      <View style={styles.answersBlock}>
        <TouchableOpacity
          style={{ ...styles.answerItem, backgroundColor: bgColor0 }}
          onPress={() => pushAnswer(0)}
        >
          <Text style={styles.answerText}>{currentQuestion.answers[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.answerItem, backgroundColor: bgColor1 }}
          onPress={() => pushAnswer(1)}
        >
          <Text style={styles.answerText}>{currentQuestion.answers[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.answerItem, backgroundColor: bgColor2 }}
          onPress={() => pushAnswer(2)}
        >
          <Text style={styles.answerText}>{currentQuestion.answers[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.answerItem, backgroundColor: bgColor3 }}
          onPress={() => pushAnswer(3)}
        >
          <Text style={styles.answerText}>{currentQuestion.answers[3]}</Text>
        </TouchableOpacity>
      </View>
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
  answerItem0: {},
})
