import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import * as Progress from 'react-native-progress'
import THEME from '../data/colors'

export default function TrueScreen({ source }) {
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
  })

  return (
    <>
      <StatusBar style="light" backgroundColor={THEME.MAIN_COLOR} />
      <View style={styles.topLine} />
      {!isLoaded ? (
        <Progress.Bar
          progress={progress}
          color={progressColor}
          width={null}
          borderWidth={0}
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
    height: 30,
  },
})
