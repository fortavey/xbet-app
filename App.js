import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FirstScreen from './src/screens/FirstScreen'
import HomeScreen from './src/screens/HomeScreen'
import ChangeLangScreen from './src/screens/ChangeLangScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import THEME from './src/data/colors'
import { LangState } from './src/context/lang/LangState'
import HeaderRight from './src/components/HeaderRight'
import HeaderRightToHome from './src/components/HeaderRightToHome'
import Question1Screen from './src/screens/Question1Screen'
import Question2Screen from './src/screens/Question2Screen'
import Question3Screen from './src/screens/Question3Screen'
import ResultScreen from './src/screens/ResultScreen'
import WebViewScreen from './src/screens/WebViewScreen'

const Stack = createNativeStackNavigator()

const topMainOptions = {
  headerStyle: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  headerTintColor: '#fff',
}

export default function App() {
  return (
    <LangState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={topMainOptions}>
          <Stack.Screen
            name="First"
            component={FirstScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="ChangeLang"
            component={ChangeLangScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Question1"
            component={Question1Screen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Question2"
            component={Question2Screen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Question3"
            component={Question3Screen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={({ navigation, route }) => ({
              headerRight: () => <HeaderRightToHome navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LangState>
  )
}
