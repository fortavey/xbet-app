import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { LangContext } from '../context/lang/langContext'
import THEME from '../data/colors'
import emblemsArr from '../data/emblemsArr'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Audio } from 'expo-av'

export default function EmblemScreen({ navigation }) {
  const [sound, setSound] = useState()
  const { lang, music } = useContext(LangContext)
  const [emblemObj, setEmblemObj] = useState(
    emblemsArr[Math.floor(Math.random() * emblemsArr.length)]
  )
  const [ansver, setAnsver] = useState([])
  const [writeAnsver, setWriteAnsver] = useState(
    emblemObj[lang].replace(' ', '')
  )
  const [letters, setLetters] = useState([])
  const [isWrite, setIsWrite] = useState(false)
  const [isFull, setIsFull] = useState(false)

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
    RU: 'Угадай эмблему',
    EN: 'Guess the emblem',
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackTitleVisible: false,
    })
  }, [navigation, lang])

  function shuffle() {
    const newArr = [...emblemObj[lang]]
    newArr.sort(() => Math.random() - 0.5)
    setLetters(newArr)
  }

  useEffect(() => {
    shuffle()
    setWriteAnsver(emblemObj[lang].replace(' ', ''))
    setAnsver([])
  }, [lang])

  useEffect(() => {
    ansver.join('') === writeAnsver ? setIsWrite(true) : setIsWrite(false)
    ansver.join('').length === writeAnsver.length
      ? setIsFull(true)
      : setIsFull(false)
    if (ansver.join('') === writeAnsver)
      music === 'true' ? playSound(true) : null
    if (
      ansver.join('').length === writeAnsver.length &&
      ansver.join('') !== writeAnsver
    )
      music === 'true' ? playSound(false) : null
  }, [ansver, lang])

  const pressLetter = (letter) => {
    const newArr = [...ansver]
    newArr.push(letter)
    if (ansver.length < writeAnsver.length) {
      setAnsver(newArr)
    }
  }

  const renderLetters = () => {
    return letters.map((letter) => {
      if (letter !== ' ')
        return (
          <TouchableOpacity
            style={styles.letter}
            key={Math.random()}
            onPress={() => pressLetter(letter)}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        )
    })
  }

  const renderAnsver = () => {
    const first = []
    const second = []
    const names = emblemObj[lang].split(' ')
    let lastI = 0
    let bc = 'white'
    if (isFull) {
      bc = isWrite ? 'green' : 'red'
    }
    for (let i = 0; i < names[0].length; i++) {
      const item = (
        <View
          style={{ ...styles.ansverItem, backgroundColor: bc }}
          key={Math.random()}
        >
          <Text style={styles.ansverItemText}>{ansver[i]}</Text>
        </View>
      )
      first.push(item)
      lastI = i
    }
    if (names.length > 1) {
      for (let i = lastI + 1; i < names[0].length + names[1].length; i++) {
        const item = (
          <View
            style={{ ...styles.ansverItem, backgroundColor: bc }}
            key={Math.random()}
          >
            <Text style={styles.ansverItemText}>{ansver[i]}</Text>
          </View>
        )
        second.push(item)
      }
    }
    return { first, second }
  }

  const pressC = () => {
    setAnsver([])
  }

  const deleteLetter = () => {
    const newArr = [...ansver]
    newArr.pop()
    setAnsver(newArr)
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.ansverBlock}>{renderAnsver().first}</View>
      {renderAnsver().second.length ? (
        <View style={styles.ansverBlock}>{renderAnsver().second}</View>
      ) : null}
      <Image style={styles.emblemImage} source={emblemObj.img} />
      <View style={styles.keyboard}>{renderLetters()}</View>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomNavigationItem}
          onPress={() => navigation.navigate('Home')}
        >
          <AntDesign name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavigationItem}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('Emblem', {
                user: 'jane',
              })
            )
          }
        >
          <Text>
            <FontAwesome name="refresh" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavigationItem}
          onPress={() => pressC()}
        >
          <Text style={{ color: '#fff', fontSize: 24 }}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavigationItem}
          onPress={() => deleteLetter()}
        >
          <Feather name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  emblemImage: {
    marginBottom: 30,
  },
  ansverBlock: {
    flexDirection: 'row',
  },
  ansverItem: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    width: 30,
    height: 40,
    marginRight: 2,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  ansverItemText: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.MAIN_COLOR,
  },
  letterText: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  bottomNavigationItem: {
    backgroundColor: THEME.MAIN_COLOR,
    width: '24%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 2,
  },
})
