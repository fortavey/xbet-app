import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { LangContext } from '../context/lang/langContext'
import BottomNavigations from '../components/BottomNavigations'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Question3Screen({ route, navigation }) {
  const { lang } = useContext(LangContext)
  const { result } = route.params

  const text = {
    title: {
      RU: 'Результат',
      EN: 'Result',
    },
    mainText: {
      RU: 'Ваш результат',
      EN: 'Your result',
    },
    badText: {
      RU: 'Очень плохо!',
      EN: 'Very bad!',
    },
    notBadText: {
      RU: 'Не плохо!',
      EN: 'Not bad!',
    },
    goodText: {
      RU: 'Хорошо!',
      EN: 'Good!',
    },
    excellentText: {
      RU: 'Превосходно!',
      EN: 'Excellent!',
    },
  }

  let resultText = ''
  switch (result) {
    case 0:
      resultText = text.badText[lang]
      break
    case 1:
      resultText = text.badText[lang]
      break
    case 2:
      resultText = text.notBadText[lang]
      break
    case 3:
      resultText = text.notBadText[lang]
      break
    case 4:
      resultText = text.notBadText[lang]
      break
    case 5:
      resultText = text.goodText[lang]
      break
    case 6:
      resultText = text.goodText[lang]
      break
    case 7:
      resultText = text.goodText[lang]
      break
    case 8:
      resultText = text.excellentText[lang]
      break
    case 9:
      resultText = text.excellentText[lang]
      break
    case 10:
      resultText = text.excellentText[lang]
      break
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: text.title[lang],
      headerBackVisible: false,
    })
  }, [navigation, lang])

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{text.mainText[lang]}</Text>
      <Image
        style={styles.cupImage}
        resizeMode="contain"
        source={require('../../assets/championships.png')}
      />
      <View style={styles.stars}>
        {result > 1 ? (
          <MaterialCommunityIcons name="star" size={50} color="gold" />
        ) : (
          <MaterialCommunityIcons
            name="star-outline"
            size={50}
            color="silver"
          />
        )}
        {result > 4 ? (
          <MaterialCommunityIcons name="star" size={50} color="gold" />
        ) : (
          <MaterialCommunityIcons
            name="star-outline"
            size={50}
            color="silver"
          />
        )}
        {result > 7 ? (
          <MaterialCommunityIcons name="star" size={50} color="gold" />
        ) : (
          <MaterialCommunityIcons
            name="star-outline"
            size={50}
            color="silver"
          />
        )}
      </View>
      <View style={styles.resultText}>
        <Text style={styles.resultTextText}>{resultText}</Text>
      </View>
      <BottomNavigations navigation={navigation} moveForward={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainText: {
    fontSize: 25,
    marginTop: 20,
  },
  cupImage: {
    width: 300,
    height: 300,
  },
  stars: {
    flexDirection: 'row',
  },
  resultText: {
    marginTop: 20,
  },
  resultTextText: {
    fontSize: 30,
  },
})
