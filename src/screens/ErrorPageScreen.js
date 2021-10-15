import React, { useContext } from 'react'
import { LangContext } from '../context/lang/langContext'
import { Text, View } from 'react-native'

export default function ErrorPageScreen({ navigation }) {
  const { lang } = useContext(LangContext)
  const title = {
    RU: 'Ошибка соединения',
    EN: 'Connection error',
  }
  const text = {
    RU: 'Ошибка интернет соединения',
    EN: 'Internet connection error',
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackTitleVisible: false,
    })
  }, [navigation, lang])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{text[lang]}</Text>
    </View>
  )
}
