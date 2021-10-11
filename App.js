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
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LangState>
  )
}