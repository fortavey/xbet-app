import { StatusBar } from 'expo-status-bar'
import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Progress from 'react-native-progress'
import THEME from '../data/colors'
import { LangContext } from '../context/lang/langContext'

export default function WebViewScreen({ route, navigation }) {
  const { lang } = useContext(LangContext)
  const { source, title } = route.params
  const [progress, setProgress] = useState(0)
  const [isLoaded, setLoaded] = useState(false)
  const [progressColor, setProgressColor] = useState(THEME.MAIN_COLOR)

  const webWiew = React.createElement(WebView, {
    style: { flex: 1, backgroundColor: THEME.MAIN_COLOR },
    source: { uri: source },
    onLoadProgress: ({ nativeEvent }) => {
      setProgress(nativeEvent.progress)
    },
    onLoadEnd: () => {
      setLoaded(true)
    },
    onError: (err) => {
      navigation.navigate('ErrorPage')
    },
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title[lang],
      headerBackTitleVisible: false,
    })
  }, [navigation, lang])

  return (
    <>
      <StatusBar style="light" backgroundColor={THEME.MAIN_COLOR} />
      <View style={styles.topLine} />
      {!isLoaded ? (
        <Progress.Bar
          progress={progress}
          color={progressColor}
          width={null}
          borderRadius={0}
        />
      ) : null}
      {webWiew}
    </>
  )
}

const styles = StyleSheet.create({
  topLine: {
    backgroundColor: THEME.MAIN_COLOR,
  },
})
